import { Server } from "socket.io";
import messageModel from "../model/message.js";

export const init = (server) => {
  console.log("Socket server initialized");

  const io = new Server(server);

  // Listen for incoming connections
  io.on('connection', (socket) => {
    console.log("Client connected");

    // Handle when a user joins a chat room
    socket.on('joinRoom', (data) => {
        const roomId = data.roomId; // Extract the 'roomId' from the received data
        const username = data.username;
      // Join the specified room
      socket.join(roomId);

      // Broadcast a message to the room to inform others of the new user
      socket.to(roomId).emit('userJoined', username);

      // Retrieve chat history and emit it to the user who joined
      messageModel
      .find({ roomId: roomId })
      .then((messages) => {
        socket.emit('chatHistory', messages);
      })
      .catch((err) => {
        console.error('Error retrieving chat history:', err);
      });
    });

    // Handle when a user sends a chat message
    socket.on('sendMessage', (roomId, message, sender) => {

        roomId = roomId.toString();

      // Save the message to MongoDB
      const newMessage = new messageModel({ roomId, message, sender });
      newMessage
      .save()
      .then((savedMessage) => {
        console.log('Message saved:', savedMessage);
  
        // Broadcast the message to the room
        socket.to(roomId).emit('message', savedMessage);
  
        // You can also emit the saved message back to the sender if needed
        socket.emit('message', savedMessage);
      })
      .catch((err) => {
        console.error('Error saving message:', err);
      });
  });

    // Handle disconnections
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};
