const express = require("express");
const chats = require("./data/data");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
dotenv.config();
connectDB();
const PORT = process.env.PORT;

app.use("/api/user", userRoutes);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, console.log(`server running on port ${PORT}`));
