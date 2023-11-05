import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  roomId: String,
  message: String,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
},
  timestamp: { type: Date, default: Date.now },
});

const messageModel = mongoose.model('Message', messageSchema);

export default messageModel;
