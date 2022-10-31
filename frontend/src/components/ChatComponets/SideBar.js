import {
  Box,
  Button,
  MenuButton,
  MenuList,
  Text,
  Tooltip,
  Menu,
  Avatar,
  MenuItem,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useToast,
  Input,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import { ChatState } from "../../Context/ChatProvide";
import { BellIcon } from "@chakra-ui/icons";
import ProfileModel from "./ProfileModel";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "../UserAvater/UserListItem";
import { getSender } from "../../Config/ChatLogics";
import { Effect } from "react-notification-badge";
import NotificationBadge from "react-notification-badge";
const SideBar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();

  const history = useHistory();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        className="ColorForBar"
      >
        <Tooltip label="Search User to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" className="button" onClick={onOpen}>
            <FiSearch />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Poppins">
          Chat-With-Anyone
        </Text>
        <div>
          <Menu>
            <MenuButton p={2}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2} color="black">
              {!notification.length && "No New Message"}
              {notification.map((item) => (
                <MenuItem
                  key={item._id}
                  onClick={() => {
                    setSelectedChat(item.chat);
                    setNotification(notification.filter((n) => n !== item));
                  }}
                >
                  {item.chat.isGroupChat
                    ? `New Message in ${item.chat.chatName}`
                    : `New Message from ${getSender(user, item.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              className="button"
              as={Button}
              rightIcon={<BiChevronDown />}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList color="black">
              <ProfileModel user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModel>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        className="color"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody mt={2}>
            <Box display="flex" pd={2}>
              <Input
                placeholder="Search "
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button className="button" onClick={handleSearch}>
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading mt={1} />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideBar;
