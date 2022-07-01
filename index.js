const express = require("express");
const port = 3000;
const app = express();
const path = require("path");

const server = require("http").Server(app);

const io = require("socket.io")(server);

const { v4: uuidV4 } = require("uuid");

//  setup the dtatsi cdirecor
app.use("/static", express.static("./static/"));

//  setup the view
app.set("view engine", "ejs");

app.get("/home", (req, res) => {
  console.log("HOME");
  res.redirect(`/${uuidV4()}`);
});
app.get("/", (req, res) => {
  return res.render("frontpage.ejs");
});
app.get("/:room", (req, res) => {
  res.render("roomfinal", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    // console.log(userId);
    console.log(" in index file  Joined room" + roomId);
    // socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.broadcast.to(roomId).emit("user-connected", userId);

    // socket.on("disconnect", () => {
    //   socket.to(roomId).broadcast.emit("user-disconnected", userId);
    // });
    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });

    socket.on("chat", function (chatObj) {
      socket.broadcast.emit("chatLeft", chatObj);
    });
  });
});

server.listen(port, function (err) {
  if (err) {
    console.log("fghjk");
  }
  console.log("server is running at " + port);
});
