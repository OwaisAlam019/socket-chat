const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html')
});
const users = {}

io.on('connection',(socket) => {
    console.log('user connected'+ socket.id);
    console.log(users);
    let nick = ""

    // socket.on("onlineUsers",()=>{
    //     io.emit("onlineUsers",{"users":users})
    // })


    socket.on("setNick",(nickName)=>{
      console.log(nickName);
      users[socket.id] = nickName
      console.log(users);
      // nick = nickName
      io.emit("onlineUsers",{"users":users})

      io.emit("chat message",{nickName:"DMP_BOT",message:`Hey ${nickName} Welcome to the world of sixlogs`})

    })
    

    socket.on("chat message",(msg) => {
        // console.log("message : "+ msg);
        socket.broadcast.emit("chat message",{nickName:msg.name , message:msg.value})
        
    })

    socket.on("typing",(msg)=>{
      console.log("typing",msg);
      io.emit("typing",msg)
      
    })
    
    socket.on('disconnect',()=>{
        console.log(`${users[socket.id]} disconnected`);

        io.emit("chat message",{nickName: users[socket.id] , message: "Gone offline"})
        
        delete users[socket.id]

        socket.broadcast.emit("onlineUsers",{"users":users})
        
        console.log(users);
    })
})
server.listen(3000, () => {
  console.log('listening on *:3000');
});