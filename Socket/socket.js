import { Server } from "socket.io";
import { SOCKET } from "../utils/const.js";

export function init(server) {
    console.log("Socket called");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log("Socket Connectio done");
socket.on(SOCKET.joinTimeSlot, async (data) => {
    console.log("Socket Connectio done on");
socket.join(data.id);
socket.to(data.id).emit(data.id);
})

})
io.on('disconnect', () => {
    console.log('A client disconnected.');
});
return io;
}

