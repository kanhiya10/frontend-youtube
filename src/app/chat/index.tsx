import { useEffect, useState, useRef } from "react";
// import socket from "../../socket/index";
import ChatLayout from "../../components/chat/ChatLayout";

const Chat = () => {
  return(<ChatLayout/>);

//   const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     socket.on("message", (msg: string) => {
//       try {
//         const parsed = JSON.parse(msg);
//         setMessages((prev) => [...prev, { from: "Server", text: parsed.text }]);
//       } catch {
//         setMessages((prev) => [...prev, { from: "Server", text: msg }]);
//       }
//     });

//     return () => socket.off("message");
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = () => {
//     if (input.trim()) {
//       socket.emit("sendMessage", input);
//       setMessages((prev) => [...prev, { from: "You", text: input }]);
//       setInput("");
//     }
//   };

//   return (
//     <div className="flex flex-col h-[75vh] w-2/3 mx-auto bg-white rounded-xl shadow-md p-6 mt-8 border border-gray-200">
//       <h2 className="text-xl font-semibold mb-4 text-purple-700">Live Chat</h2>
//       <div className="flex-1 overflow-y-auto mb-4 px-2 space-y-2">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`max-w-[70%] p-3 rounded-lg ${
//               msg.from === "You"
//                 ? "bg-purple-100 self-end ml-auto text-right"
//                 : "bg-green-100 self-start mr-auto text-left"
//             }`}
//           >
//             <span className="block text-xs font-medium text-gray-500 mb-1">
//               {msg.from}
//             </span>
//             <span className="text-sm text-gray-800">{msg.text}</span>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="flex gap-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-purple-600 text-white rounded-full px-5 py-2 font-medium hover:bg-purple-700 transition"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
};

export default Chat;
