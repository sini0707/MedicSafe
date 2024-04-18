import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { baseURL } from "../../../../backend/config/db";
import { doctoken } from "../../../config";

const ENDPOINT = "http://localhost:8000";
var socket, selectedChatCompare;

const DoctorChat = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]); 
  const [rooms, setRooms] = useState("");
  const [error, setError] = useState("");
  const [chats, setChats] = useState([]);
  const [messageSent, setMessageSent] = useState(false);
  const [chatId, setChatId] = useState("");
  const [userContacts, setUserContacts] = useState([]);
  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);




  const doctorInfo = useSelector((state) => state.docAuth.doctorInfo);
 
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", doctorInfo);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        console.log("Fetching doctor rooms...");
        console.log(doctoken,'token is got')
        console.log(doctorInfo._id,'doctor info  id gott ittt')
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
        console.log("JSON data received:",result);


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




  const handleRoomClick = (chatId, patient) => {
   
    setChatId(chatId);
    setPatient(patient);
  
  };



  const handleStartChatWithDoctor = (chatId, patient, doctor) => {
    // Set the chat ID, patient information, and doctor information
    setChatId(chatId);
    setPatient(patient);
    setDoctor(doctor);
    // Additional logic to start a chat with the doctor
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


  const handleSend = () => {
    if (typedMessage.trim() !== '') {
      
      setChatMessages([...chatMessages, { type: 'doctor', text: typedMessage }]);
     
      setTypedMessage('');
    }

  } 
 

   
  return (
<div className=" font-semibold">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/4 bg-white border-r border-gray-300">
            {/* Sidebar Header */}
            <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
            <span className="font-bold">Active Conversations</span>
              <div className="relative">
                <button id="menuButton" className="focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                  </svg>
                </button>
                {/* Menu Dropdown */}
                <div id="menuDropdown" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden">
                  <ul className="py-2 px-3">
                    <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a></li>
                    <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a></li>
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
            >
              <button
                    className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                    onClick={() => handleStartChatWithDoctor(chat._id, chat.user, chat.doctor)}
                  >
                  
                    <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                     
                      {/* <img src={chat.user.photo} alt="User" className="h-full w-full rounded-full" /> */}
                    </div>
                    <div className="ml-2 text-sm font-semibold">{chat.user.name}</div>
                  </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto">
            <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">U</div>
              <div className="ml-2 text-sm font-semibold">No chats</div>
            </button>
          </div>
        )}
      </div>
    </div>
  
           

          {/* Main Chat Area */}
          <div className="w-4/5">
            {/* Chat Header */}
            <header className="bg-white p-4 text-gray-700">
              {/* <h1 className="text-2xl font-semibold">Alice</h1> */}
            </header>

            {/* Chat Messages */}
            <div className="h-screen overflow-y-auto p-4 pb-36">
            {chatMessages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.type === 'doctor' ? 'text-right' : ''}`}>
                <p className={`bg-${message.type === 'doctor' ? 'indigo-500 text-white' : 'gray-200 text-gray-700'} rounded-lg py-2 px-4 inline-block`}>
                  {message.text}
                </p>
              </div>
            ))}
            </div>

            {/* Chat Input */}
            <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
              <div className="flex items-center">
              <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)} 
          />
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
            onClick={handleSend} 
          >
            Send
          </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );

  
}

export default DoctorChat
