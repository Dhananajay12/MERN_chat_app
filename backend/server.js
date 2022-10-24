const express = require("express");
const chats = require("./data/data");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("API is running");
});
app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const sinleChat = chats.find((c) => c._id === req.params.id);

  res.send(sinleChat);
});

app.listen(PORT, console.log(`server running on port ${PORT}`));
