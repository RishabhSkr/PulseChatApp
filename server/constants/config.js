const corsOptions = {
    origin: [
      "http://localhost:5173",
      "https://pulsechatapp.onrender.com",
      "https://pulse-chat-app.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };