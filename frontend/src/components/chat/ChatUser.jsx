import { useEffect, useState } from "react";
import io from "socket.io-client";
import { toast } from 'react-toastify';
import { baseURL } from "../../../../backend/config/db";
import { token } from "../../../config";



const ENDPOINT = "http://localhost:8000";
let socket, selectedChatCompare;

const ChatUser = ({ user,doctor }) => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [room, setRoom] = useState({});


  
  useEffect(() => {
    if (user) {
  
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connection", () => setSocketConnected(true));
    }
  }, [ENDPOINT, user]);
 
 

  useEffect(() => {
    if (doctor && user) {
      const fetchRoom = async () => {
         try {
          const res = await fetch(
            `${baseURL}/users/getRoom/${doctor}/${user}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log(res,"getroom dataaaa")
          if (res.ok) {
           
            const data = await res.json();
           
          
          } else {
          
            console.error("Failed to fetch room data:", res.statusText);
          }

          
        } catch (error) {
          console.error("Error fetching room data:", error);
        }
      };
      fetchRoom();
    }
  }, [user, doctor]);



  

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  const handleSend = () => {
    if (userInput.trim() !== '') {
      setMessages([...messages, { type: 'user', text: userInput }]);
      respondToUser(userInput);
      setUserInput('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const addUserMessage = (message) => {
    setMessages([...messages, { type: 'user', text: message }]);
  };

  const addBotMessage = (message) => {
    setMessages([...messages, { type: 'bot', text: message }]);
  };

  const respondToUser = (userMessage) => {
    // Replace this with your chatbot logic
    setTimeout(() => {
      addBotMessage('This is a response from the chatbot.');
    }, 500);
  };

  return (
    <>
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <button
          id="open-chat"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
          onClick={toggleChatbox}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Chat with Doctor
        </button>
      </div>
      <div
        id="chat-container"
        className={`fixed bottom-16 right-4 w-96 ${isChatboxOpen ? '' : 'hidden'}`}
      >
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
          <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold">Chat</p>
            <button
              id="close-chat"
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              onClick={toggleChatbox}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
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
            </button>
          </div>
          <div id="chatbox" className="p-4 h-80 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.type === 'user' ? 'text-right' : ''}`}>
                <p
                  className={`bg-${message.type === 'user' ? 'blue-500 text-white' : 'gray-200 text-gray-700'} rounded-lg py-2 px-4 inline-block`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex">
            <input
              id="user-input"
              type="text"
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              id="send-button"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );

}

export default ChatUser
