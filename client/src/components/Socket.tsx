import io from "socket.io-client";

const SERVER = "https://gramana-server-9dza.onrender.com";
const socket = io(SERVER);
export default socket;
