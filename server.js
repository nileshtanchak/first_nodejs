import Express from "express";
import http from "http";
import Router from "./routes/user.js";
import {connectDb} from "./db/db.js";
import {init} from './Socket/socket.js';
const app = Express();
app.use(Express.json());


connectDb();


app.use("/api/v1", Router);
app.use("/api/v1", Router);


const server = http.createServer(app);

server.listen(3000, "192.168.35.131", (req, res) => {
    console.log("server connected with port 4000")
})
// init(server);   