import { Server } from "socket.io";
import messageModel from "../model/message.js";

export const init = (server) => {
  console.log("Socket server initialized");

  const io = new Server(server);

  // Listen for incoming connections
  io.on('connection', (socket) => {
    console.log("Client connected");

    // Handle when a user joins a chat room
    socket.on('joinRoom', (roomId, username) => {
      // Join the specified room
      socket.join(roomId);

      // Broadcast a message to the room to inform others of the new user
      socket.to(roomId).emit('userJoined', username);

      // Retrieve chat history and emit it to the user who joined
      messageModel.find({ roomId: roomId }, (err, messages) => {
        if (err) {
          console.error('Error retrieving chat history:', err);
        } else {
          socket.emit('chatHistory', messages);
        }
      });
    });

    // Handle when a user sends a chat message
    socket.on('sendMessage', (roomId, message, sender) => {
      // Save the message to MongoDB
      const newMessage = new messageModel({ roomId, message, sender });
      newMessage.save((err, savedMessage) => {
        if (err) {
          console.error('Error saving message:', err);
        } else {
          console.log('Message saved:', savedMessage);

          // Broadcast the message to the room
          socket.to(roomId).emit('message', savedMessage); // Emit the saved message
          
          // You can also emit the saved message back to the sender if needed
          socket.emit('message', savedMessage);
        }
      });
    });

    // Handle disconnections
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};
