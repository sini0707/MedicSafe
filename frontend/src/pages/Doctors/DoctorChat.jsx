import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:8000";
var socket, selectedChatCompare;

const DoctorChat = () => {
  const [socketConnected, setSocketConnected] = useState(false);



  const doctorInfo = useSelector((state) => state.docAuth.doctorInfo);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", doctorInfo);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  

   
  return (
<div className="pt-20 font-semibold"> {/* Add padding top here */}
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/4 bg-white border-r border-gray-300">
            {/* Sidebar Header */}
            <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
              <h1 className="text-2xl font-semibold">Chat Web</h1>
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
              {/* Contact items */}
              {/* You can map through contacts here */}
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
              {/* Chat messages */}
              {/* You can map through messages here */}
            </div>

            {/* Chat Input */}
            <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
              <div className="flex items-center">
                <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );

  
}

export default DoctorChat
