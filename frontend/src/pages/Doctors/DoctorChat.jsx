import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { baseURL } from "../../../../backend/config/db";
import { doctoken } from "../../../config";
import { toast } from "react-toastify";
import { IoCheckmark } from "react-icons/io5";
import { RiCheckDoubleFill } from "react-icons/ri";

const ENDPOINT = "http://localhost:8000";
var socket, selectedChatCompare;

const DoctorChat = () => {
  const [socketConnected, setSocketConnected] = useState(false);

  const [rooms, setRooms] = useState("");
  const [error, setError] = useState("");
  const [chats, setChats] = useState([]);
  const [messageSent, setMessageSent] = useState(false);
  const [chatId, setChatId] = useState("");

  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [content, setContent] = useState("");
  const [readStatus, setReadStatus] = useState({});

  const doctorInfo = useSelector((state) => state.docAuth.doctorInfo);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("connection", () => setSocketConnected(true));
    socket.emit("setup", doctorInfo);
  }, []);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(
          `${baseURL}/doctors/get-doctor-rooms/${doctorInfo._id}`,
          {
            method: "get",
            headers: {
              Authorization: `Bearer ${doctoken}`,
            },
          }
        );
        let result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        const sortedRooms = result.sort((a, b) => {
          return (
            new Date(b.latestMessageTimestamp) -
            new Date(a.latestMessageTimestamp)
          );
        });

        setRooms(sortedRooms);
      } catch (error) {
        setError(error);
        console.log("error", error);
      }
    };
    fetchRoom();
  }, [doctorInfo._id]);

  const handleStartChatWithDoctor = (chatId, patient, doctor) => {
    setChatId(chatId);
    setPatient(patient);
    setDoctor(doctor);
  };

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch(
          `${baseURL}/doctors/get-rooms-messages/${chatId}`,
          {
            method: "get",
            headers: {
              Authorization: `Bearer ${doctoken}`,
            },
          }
        );

        let result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }
        setChats(result);
        setMessageSent(false);
        selectedChatCompare = chats;
        socket.emit("join_chat", chatId);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchMessage();
  }, [chatId, messageSent]);

  const formatChatTime = (createdAt) => {
    const date = new Date(createdAt);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleDateString("en-US", options);
  };

  const markMessageAsRead = async (roomId) => {
    try {
      const res = await fetch(
        `${baseURL}/doctors/mark-room-message-read/${roomId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${doctoken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const sendHandler = async () => {
    if (content.trim() === "") {
      toast.error("Message cannot be empty");
      return;
    }

    const sendMessage = async () => {
      try {
        const res = await fetch(
          `${baseURL}/doctors/sendChat/${chatId}/${doctorInfo._id}/Doctor/${patient._id}/${doctorInfo.name}`,
          {
            method: "post",
            headers: {
              Authorization: `Bearer ${doctoken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: content }),
          }
        );

        let result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }
        setContent("");
        setMessageSent(true);
        socket.emit("new Message", result);
      } catch (error) {
        console.log("error", error);
      }
    };
    sendMessage();
  };

  useEffect(() => {
    socket.on("message recevied", (newMessageReceived) => {
      if (!selectedChatCompare || chatId !== newMessageReceived.room._id) {
        //empty
      } else {
        setChats([...chats, newMessageReceived]);
      }
    });
  }, [chatId, selectedChatCompare, chats]);
  useEffect(() => {
    socket.on("newUserMessage", (newMessage) => {
      setChats((prevChats) => [...prevChats, newMessage]);
    });
  }, []);

  return (
    <div className=" font-semibold">
      <div className="flex h-screen overflow-hidden">
        <div className="w-1/4 bg-white border-r border-gray-300">
          <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
            <span className="font-bold">Active Conversations</span>
            <div className="relative">
              <button id="menuButton" className="focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                </svg>
              </button>

              <div
                id="menuDropdown"
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden"
              >
                <ul className="py-2 px-3">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                    >
                      Option 1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                    >
                      Option 2
                    </a>
                  </li>
                  {/* Add more menu options here */}
                </ul>
              </div>
            </div>
          </header>

          {/* Contact List */}
          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
            {rooms.length > 0 ? (
              rooms.map((chat) => (
                <div
                  key={chat._id}
                  className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto"
                  onClick={() => {
                    setChatId((prevChatId) => chat._id);
                    setPatient((prevPatient) => chat.user);
                    markMessageAsRead(chat._id);
                  }}
                >
                  <button
                    className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                    onClick={() =>
                      handleStartChatWithDoctor(
                        chat._id,
                        chat.user,
                        chat.doctor
                      )
                    }
                  >
                    <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                      {/* <img src={chat.user.photo} alt="User" className="h-full w-full rounded-full" /> */}
                    </div>
                    <div className="ml-2 text-sm font-semibold">
                      {chat.user.name}
                    </div>
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto">
                <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                  <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                    U
                  </div>
                  <div className="ml-2 text-sm font-semibold">No chats</div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              {chatId ? (
                chats && chats.length > 0 ? (
                  chats.map((chat, index) => (
                    <div key={index} className="flex flex-col h-full">
                      <div className="grid grid-cols-12 gap-y-2">
                        {chat.senderType === "User" ? (
                          <div className="col-start-1 col-end-8 p-3 rounded-lg">
                            <div className="flex flex-row items-center">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                U
                              </div>

                              <div
                                className={`relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl ${
                                  readStatus[chat._id] ? "bg-blue-100" : ""
                                }`}
                              >
                                <div> {chat.content}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {formatChatTime(chat.createdAt)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="col-start-6 col-end-13 p-3 rounded-lg">
                            <div className="flex items-center justify-start flex-row-reverse">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                Me
                              </div>
                              <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                <div> {chat.content}</div>
                                {chat.read ? (
                                  <RiCheckDoubleFill className="absolute ml-10 top-1 right-1 text-sm text-black-500" />
                                ) : (
                                  <IoCheckmark className="absolute ml-10 top-1 right-1 text-lg text-black-500" />
                                )}
                                <div className="text-xs text-gray-500 mt-1">
                                  {formatChatTime(chat.createdAt)}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <h1>No Chats available!!</h1>
                )
              ) : null}
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600"></button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                  <button
                    // onClick={() => sendHandler()}
                    className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                  ></button>
                </div>
              </div>
              <div className="ml-4">
                <button
                  onClick={() => sendHandler()}
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorChat;
