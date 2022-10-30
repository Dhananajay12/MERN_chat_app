const express = require("express");
const { sendMessage, allMessage } = require("../controllers/messageController");
const { middlewares } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(middlewares, sendMessage);
router.route("/:chatId").get(middlewares, allMessage);

module.exports = router;
