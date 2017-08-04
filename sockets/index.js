module.exports = function(io) {
  io.on('connection', function (socket) {
    console.log("Client connection", socket.id);
    socket.on('hello', function (data) {
      console.log(data);
      socket.emit("hello", data)
    });
  });
};
