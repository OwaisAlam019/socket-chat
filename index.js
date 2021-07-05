const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html')
});

io.on('connection',(socket) => {
    console.log('user connected');
    io.emit("chat message",{nickName:"DMP_BOT",message:"hEY Welcome to the world of sixlogs"})
    socket.on("chat message",(msg) => {
        // console.log("message : "+ msg);
        io.emit("chat message",{nickName:"Sixlogs User",message:msg})


    })

    socket.on("typing",(msg)=>{
      console.log("typing");
      io.emit("typing",{nickName:"Owais"})
      
    })
    
    // socket.on('disconnect',()=>{
    //     console.log("user disconnected");
    // })
})
server.listen(3000, () => {
  console.log('listening on *:3000');
});