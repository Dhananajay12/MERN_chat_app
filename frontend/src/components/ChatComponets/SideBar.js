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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import { ChatState } from "../../Context/ChatProvide";
import { BellIcon } from "@chakra-ui/icons";
import ProfileModel from "./ProfileModel";
import { useHistory } from "react-router-dom";

const SideBar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user } = ChatState();

  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  console.log(user);
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search User to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost">
            <FiSearch />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="work snas">
          Chat-With-Anyone
        </Text>
        <div>
          <Menu>
            <MenuButton p={2}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* <MenuList>
          </MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<BiChevronDown />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModel>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default SideBar;
