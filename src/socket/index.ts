import { io } from "socket.io-client";

// Assuming your backend is service-named "backend" in docker-compose
const socket = io("http://localhost:8001", {
  withCredentials: true,
});
// Replace with correct internal or proxied address if needed

socket.on("connect", () => {
  console.log("Socket connected successfully:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
});

export default socket;
