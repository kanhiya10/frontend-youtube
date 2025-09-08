import { io } from "socket.io-client";

// Assuming your backend is service-named "backend" in docker-compose
const socket = io("https://backend-youtube-zba1.onrender.com", {
  withCredentials: true,
});
// Replace with correct internal or proxied address if needed

socket.on("connect", () => {
});

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
});

export default socket;
