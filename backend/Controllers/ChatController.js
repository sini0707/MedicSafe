
import ChatRoom from "../models/chatRoom.js";
import ChatMessage from "../models/chatMessage.js";



export const getRoomMessages = async (req, res) => {
console.log("hello")

}


export const getRoom = async (req, res) => {
  

    try {
       
        const { doctorId, userId } = req.params;
       

        
        const room = await ChatRoom.findOne({ doctor: doctorId, user: userId });
        console.log(room);


        
        if (room) {
            
            res.status(200).json({ success: true, data: room });
        } else {
           
            res.status(404).json({ success: false, message: "Room not found" });
        }
    } catch (error) {
       
        console.error("Error fetching room data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
    
    




export const createRoom = async (req, res) => {
   console.log("create Room");

};



export const sendChat = async (req, res) => {

}