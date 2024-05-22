import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { baseURL } from "../../../../backend/config/db";
import { token } from "../../../config";
import { RiCheckDoubleFill } from "react-icons/ri";
import { IoCheckmark } from "react-icons/io5";
import { GrSend } from "react-icons/gr";
import AnimationTyping from "../AnimationTyping/AnimationTyping.jsx";

const ENDPOINT = "http://localhost:8000";
let socket, selectedChatCompare;

const ChatUser = ({ onClose, doctor, user, photo, doctorPic, userName }) => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [room, setRoom] = useState({});

  const [chats, setChats] = useState([]);
  const [content, setContent] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user) {
      socket = io(ENDPOINT);
      socket.on("connection", () => setSocketConnected(true));
      socket.emit("setup", user);
    }
  }, [ENDPOINT, user]);

  useEffect(() => {
    if (doctor && user) {
      const fetchRoom = async () => {
        try {
          const res = await fetch(
            `${baseURL}/users/getRoom/${doctor}/${user}`,
            {
              method: "get",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          let result = await res.json();

          if (!res.ok) {
            throw new Error(result.message);
          }

          setRoom(result.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchRoom();
    }
  }, [user, doctor]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch(`${baseURL}/users/getRoomMessage/${room._id}`, {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        setChats(result);
        setMessageSent(false);
        socket.emit("join_chat", room._id);
        selectedChatCompare = chats;
        scrollToBottom();
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchMessage();
  }, [room._id, messageSent]);

  const sendHandler = async () => {
    if (content === "") {
      toast.error("message cannot be empty");
      return;
    }

    const sendChat = async () => {
      try {
        if (!room._id) {
          console.error("Room ID is undefined");
          return;
        }

        const res = await fetch(
          `${baseURL}/users/sendChat/${user}/${room._id}/User/${doctor}/${userName}`,
          {
            method: "post",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: content, read: false }),
          }
        );

        let result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        setContent("");
        setMessageSent(true);
        socket.emit("new Message", result);
        scrollToBottom();
      } catch (error) {
        console.log("error", error);
      }
    };
    sendChat();
  };

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChatCompare || room._id !== newMessageReceived.room._id) {
      } else {
        setChats([...chats, newMessageReceived]);
        scrollToBottom();
      }
    });
  });

  useEffect(() => {
    socket.on("typing", ({ isTyping }) => {
      setIsTyping(isTyping);
    });
  }, []);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatChatTime = (createdAt) => {
    const date = new Date(createdAt);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleDateString("en-US", options);
  };

  const handleTyping = () => {
    clearTimeout(typingTimeoutRef.current);
    setIsTyping(true);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit("typing", { roomID: room._id, isTyping: false });
    }, 2000);

    socket.emit("typing", { roomID: room._id, isTyping: true });
  };

  useEffect(() => {
    socket.on("typing", ({ roomID, isTyping }) => {
      if (roomID === room._id && !selectedChatCompare) {
        setIsTyping(isTyping);
      }
    });
  }, [room._id, selectedChatCompare]);

  return (
    <div className="flex flex-col items-center justify-center w-[500px] min-h-[540px] text-gray-800 p-10">
      <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {chats && chats.length > 0 ? (
            chats.map((chat, index) => (
              <div
                key={index}
                className={`flex w-full mt-2 space-x-3 max-w-xs ${
                  chat.senderType === "User" ? "ml-auto justify-end" : ""
                }`}
              >
                {chat.senderType === "User" ? (
                  <div className="flex w-full mt-2 space-x-3 max-w-xl ml-auto justify-end">
                    <div>
                      <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg relative ">
                        <p className="text-sm whitespace-normal">
                          {chat.content}
                          {chat.read ? (
                            <RiCheckDoubleFill className="absolute ml-10 top-1 right-1 text-sm text-black-500" />
                          ) : (
                            <IoCheckmark className="absolute ml-10 top-1 right-1 text-lg text-black-500" />
                          )}
                        </p>
                      </div>

                      <span className="text-xs text-gray-500 leading-none">
                        {formatChatTime(chat.createdAt)}
                      </span>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 ">
                      <img
                        src={photo}
                        alt=""
                        className=" rounded-full h-full w-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className={`flex w-full mt-2 space-x-3 max-w-xs`}>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                      <img
                        src={doctorPic}
                        alt=""
                        className=" rounded-full h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">{chat.content}</p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        {formatChatTime(chat.createdAt)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No messages</p>
          )}
          <div ref={messagesEndRef} />
        </div>
        {isTyping && <AnimationTyping />}

        <div className="bg-blue-500 p-4 flex">
          <input
            onChange={(e) => {
              setContent(e.target.value);
              handleTyping();
            }}
            value={content}
            className="flex items-center h-10 w-4/5 rounded px-3 text-sm"
            type="text"
            placeholder="Type your message…"
          />
          <button
            onClick={() => sendHandler()}
            className="rounded-full flex items-center ml-2 hover:scale-105 transition duration-100 ease-in-out cursor-pointer justify-center w-1/5 bg-[#8b5cf6]"
          >
            <GrSend className="text-[22px]" />
          </button>
        </div>
      </div>

      <div className="absolute top-2 left-5 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};

export default ChatUser;
