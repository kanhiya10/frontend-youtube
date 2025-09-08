# 🎥 VideoTube Frontend

[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com/)
[![Status](https://img.shields.io/badge/Status-Active-success)]()

This is the **frontend** of **VideoTube**, a full-stack video streaming and social platform inspired by YouTube.  
Built with **React + TypeScript** and deployed on **Vercel**.

👉 **Live Demo**: [VideoTube Frontend](https://frontend-youtube-three.vercel.app/)

⚠️ **Note**: Since the backend is hosted on a free tier at Render, the API may take **30–60 seconds to respond initially**. Please be patient.

---

## 🚀 Features
- 🎬 **Video Upload & Streaming** – Seamless playback via Cloudinary  
- 📡 **Live Streaming** – Real-time creator–audience engagement  
- ❤️ **Like, Comment, Subscribe** – Full interaction features  
- 🔍 **Search** – Find videos and channels  
- 🎨 **Theming** – Light/Dark mode toggle  
- 🔔 **Push Notifications** – Via Firebase Cloud Messaging  

---

## 🛠️ Tech Stack
- **React.js (TypeScript)** – UI framework  
- **TailwindCSS** – Styling  
- **cookies in frontend** – Authentication (Email + Google)  
- **Axios + Context API/Redux Toolkit** – State management & API calls  
- **Firebase Cloud Messaging** – Notifications
- **Video.js** - videoPlayer
- **websocket's** - for real time communication

---

## 📂 Project Structure

src/
┣ components/ # UI Components
┣ app/ # Route pages
┣ context/ # Theme/Auth Context
┣ features/ #  redux slices
┣ services/ # API logic (Axios)
┣ utils/ # utility functions
┣ hooks/ # resuse logic
┣ types/ # TypeScript types
┗ App.tsx # Root Component

🖼️ Screenshots
<img width="1910" height="890" alt="Screenshot 2025-09-08 145605" src="https://github.com/user-attachments/assets/d378f8bd-2ab1-45d9-85bf-7780d9b5f3ed" />


<img width="1903" height="893" alt="Screenshot 2025-09-03 140140" src="https://github.com/user-attachments/assets/5b19e670-4729-4209-8e6d-e9240f4df919" />
<img width="1907" height="883" alt="Screenshot 2025-09-08 150005" src="https://github.com/user-attachments/assets/60139734-e4f8-4c58-b0da-ace46de0d729" />

<img width="1900" height="884" alt="Screenshot 2025-09-08 150208" src="https://github.com/user-attachments/assets/be2029a6-e572-4b83-ac7d-b627c12477c0" />

## 🔧 Getting Started (Local Setup)

1. Clone the repo  
   ```bash
   git clone https://github.com/your-username/videotube-frontend.git
   cd videotube-frontend
   npm install
   VITE_API_URL=http://localhost:8001/api/v1
   clientId = your key
   npm run dev
   
Contributions are welcome! Feel free to open issues or PRs.
