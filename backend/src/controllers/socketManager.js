import { Server } from "socket.io"



let connection = {}
let messages = {}
let timeOnline = {}



export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  })

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id)
    
    socket.on("join-call", (path) => {
      if(connection[path] === undefined){
        connection[path] = []
      }
      connection[path].push(socket.id)

      timeOnline[socket.id] = new Date()

    //  connection[path].forEach(elem  => {
      //  io.to(elem)

      //})

      for(let a = 0; a < connection[path].length; a++){
        
        io.to(connection[path][a]).emit("user-joined", socket.id, connection[path])}
      


      })
    
    socket.on("signal", (toId, messages) => {
      io.to(toId).emit("signal", socket.id,messages)
    })

    socket.on("chat-message", (data,sender) => {

    })

    socket.on("disconnect", () => {

    })
    

  })

  return io
}