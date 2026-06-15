import { io } from "socket.io-client";

// Connect to your backend
const socket = io("/", {
  path: "/socket.io/", // must match backend path
  withCredentials: true,
  transports: ["websocket", "polling"],
});

// ====== Connection success ======
socket.on("connect", () => {
  console.log("✅ Connected to server");
  console.log("Socket ID:", socket.id);
});

// ====== Connection error ======
socket.on("connect_error", (err) => {
  console.error("❌ Connection failed:", err.message);
});

// ====== Disconnected ======
socket.on("disconnect", (reason) => {
  console.warn("⚠️ Disconnected:", reason);
});
// Replace with correct internal or proxied address if needed

socket.on("connect", () => {
});

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
});

export default socket;
