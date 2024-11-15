import * as WebSocket from 'ws';

class WebSocketServer {
    private _port: number;
    private _server: WebSocket.WebSocketServer;

    constructor() {
        this._port = 5000;
        this._server = new WebSocket.WebSocketServer({
            port: this._port
        });
    }

    public start = () => {
        this._server.on("connection", (socket: WebSocket) => {
            console.log("A client just connected.");

            socket.on('message', (data: WebSocket.RawData, isBinary: boolean) => {
                if (!isBinary) {
                    const message = data.toString();
                    console.log(message);
                    this.broadcastMessage(message);
                }
            });
        });

        console.log((new Date()) + " Server is listening on port " + this._port);
    }

    public broadcastMessage = (message: string) => {
        this._server.clients.forEach((client: WebSocket.WebSocket) => {
            client.send(message);
        })
    };
}

const server = new WebSocketServer();
server.start();


export { WebSocketServer };
