import { Server } from "socket.io"

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  })

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id)
  })

  return io
}