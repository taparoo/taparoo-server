module.exports = function(io) {
  io.on('connection', function (socket) {
    console.log("Client connection", socket.id);
    socket.on('tapUpdate', function (data) {
      console.log(data);
      io.emit("tapUpdate", data)
    });
  });
};
