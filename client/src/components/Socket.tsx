import io from "socket.io-client";

const SERVER = process.env.NEXT_PUBLIC_SERVER_DOMAIN || "http://localhost:5000";
const socket = io(SERVER);
export default socket;
