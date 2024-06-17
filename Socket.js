const { Server } = require("socket.io");

class Socket {
    constructor() {
        if (Socket.instance) {
            return Socket.instance;
        }
        this.io = null;
        Socket.instance = this;
    }

    init(httpServer, options) {
        this.io = new Server(httpServer, options);
        return this.io;
    }

    getIO() {
        if (!this.io) {
            throw new Error("Socket.io not initialized!");
        }
        return this.io;
    }
}

module.exports = new Socket();
