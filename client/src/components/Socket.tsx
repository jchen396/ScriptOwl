import io from "socket.io-client";

const SERVER =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5000"
        : .process.env.NEXT_PUBLIC_SERVER_URL;
const socket = io(SERVER);
export default socket;
