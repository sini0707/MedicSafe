
import ChatRoom from "../models/chatRoom.js";
import ChatMessage from "../models/chatMessage.js";



export const getRoomMessages = async (req, res) => {
    const { roomId } = req.params;
     console.log("Room ID:", roomId); 
    try {
      const messages = await ChatMessage.find({ room: roomId }).sort({
        createdAt: 1,
      });

      if (messages) {
        console.log("Messages found:", messages);
        res.status(200).json(messages);
      } else {
        console.log("No messages found for the given room");
        res.status(404).json({ message: "No message found for the given room " });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server Error" });
    }

}




export const getRoom = async (req, res) => {
  

    try {
       
        const { doctorId, userId } = req.params;
       

        
        const room = await ChatRoom.findOne({ doctor: doctorId, user: userId });


        
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
    try {
        const { doctorId, userId } = req.params;
      
    
        let chatRoom = await ChatRoom.findOne({
          user: userId,
          doctor: doctorId,
        });
    
        if (!chatRoom) {
          chatRoom = new ChatRoom({
            user: userId,
            doctor: doctorId,
            message: [],
          });
          await chatRoom.save();
        }
    
        const roomDetails = await ChatRoom.findOne({ _id: chatRoom._id }).populate({
          path: "doctor",
          select: "_id name specialization",
        });
    
        res
          .status(200)
          .json({ message: "Chat room found or created", data: roomDetails });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating or getting  chat room" });
      }

};




export const sendChat = async (req, res) => {
    const { content, read } = req.body;
    
  
    const { sender, roomId, type, Id, senderName } = req.params;
 
  
    const newMessage = new ChatMessage({
      room: roomId,
      sender: sender,
      senderType: type,
      receiver: Id,
      content: content,
      senderName: senderName,
      read: read,
    });
  
    await newMessage.save();
  
    let chatRoom = await ChatRoom.findOne({ _id: roomId });
  
    if (chatRoom) {
      chatRoom.messages.push(newMessage._id);
  
      // Update the latestMessageTimestamp to the current time
      chatRoom.latestMessageTimestamp = newMessage.createdAt; // Assuming createdAt is the timestamp of the new message
  
      // Save the updated chat room
  
      await chatRoom.save();
    }
  
    await newMessage.populate([
      { path: "sender", select: "_id name email" },
      {
        path: "room",
        populate: [
          { path: "user", select: "_id name email" },
          { path: "doctor", select: "_id name email" },
        ],
      },
    ]);
  
    res.json(newMessage);
  };


  export const getDoctorRooms = async (req, res) => {
    try {
        const docId = req.params.id;
        
    
        const rooms = await ChatRoom.find({ doctor: docId }).populate({
          path: "user",
          select: "_id name email",
        });
    
     
    
        if (rooms.length > 0) {
          res.status(200).json(rooms);
        } else {
          res
            .status(404)
            .json({ message: "No rooms found for the specified doctor" });
        }
      } catch (error) {
        console.error("Error fetching doctor rooms:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };

  