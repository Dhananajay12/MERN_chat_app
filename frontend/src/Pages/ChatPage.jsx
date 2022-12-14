import { Box } from "@chakra-ui/react";
import { useState } from "react";
import ChatBox from "../components/ChatComponets/ChatBox";
import MyChat from "../components/ChatComponets/MyChat";
import SideBar from "../components/ChatComponets/SideBar";
import { ChatState } from "../Context/ChatProvide";

const ChatPage = () => {
  const { user } = ChatState();

  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideBar />}

      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChat fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
