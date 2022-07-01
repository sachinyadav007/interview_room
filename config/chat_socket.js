//  FOR SERVER SIDE

//
// module.exports.chatSockets = function (socketServer) {
//   let io = require("socket.io")(socketServer);
//   //    yeah servser p check karega agr connection stablist ho gya than iw would run connect event
//   //  as callback in fronend file
//   io.sockets.on("connection", function (socket) {
//     console.log("new connection established!", socket.id);
//     socket.on("disconnect", function () {
//       console.log("socket is Disconnect");
//     });

//     // cliend se jo request ayi hai jpined room ki wo karega
//     socket.on("join_room", function (data) {
//       console.log(" Joining room ", data);

//       socket.join(data.chatroom);

//       //   join krane k baad clin p event perform krwayge
//       //  joined room yeah emit event karega
//       io.in(data.chatroom).emit("user_joined", data);
//     });

//     socket.on("send-message", function (data) {
//       console.log("server send the message ->>>>>>>" + data.chatroom);
//       io.in(data.chatroom).emit("received-message", data);
//     });
//   });
// };

//  detecting event by on keyword
//  and emiting event by emit keyword

//  pending fiture
//  igf the user is differne tthan alligment shouls be alos different

module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer);

  io.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId) => {
      socket.join(roomId);
      socket.to(roomId).broadcast.emit("user-connected", userId);

      socket.on("disconnect", () => {
        socket.to(roomId).broadcast.emit("user-disconnected", userId);
      });
    });
  });
};
