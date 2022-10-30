import { Box } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../Context/ChatProvide";
import SingleChat from "../UserAvater/SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{
        base: selectedChat ? "flex" : "none",
        md: "block",
        lg: "flex",
      }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderWidth="lg"
      borderRadius="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
