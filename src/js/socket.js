import { io } from "socket.io-client";

const serverUrl = "http://localhost:4000/";

const socket = io(serverUrl);

export { socket };