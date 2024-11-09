const WebSocket = require('ws');

const port = 5000;

const wsServer = new WebSocket.Server({
    port: port
});

const broadcastMessage = (message) => {
    wsServer.clients.forEach(function (client) {
        client.send("Someone said: " + message);
    })
}

wsServer.on("connection", (socket, request) => {
    console.log('A client just connected right now.');

    socket.on('message', function (msg) {
        console.log("Received message from client: " + msg);

        // broadcast message to all connected clients
        broadcastMessage(msg);
    });
});

console.log((new Date()) + " Server is listening on port " + port);