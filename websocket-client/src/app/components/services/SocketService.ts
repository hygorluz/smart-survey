import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket: Socket;

    constructor() {
        this.socket = io('https://websocket-server-gur3.onrender.com/');
    }

    getSocket(): Socket {
        return this.socket;
    }
}
