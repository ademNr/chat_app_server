const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("message", 
   data
 
    );
     console.log(`User with ID: ${socket.id} with the name of ${data.senderName} sent a message : ${data.message} in the room ${data.room} at ${data.sentAt}`);
   });

  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`User with ID: ${socket.id} with the name ${ data.joinerName } joined room: ${data.room}`);
  });

  

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("SERVER RUNNING");
});