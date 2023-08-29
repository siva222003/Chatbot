import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { chatCompletion } from "../store/slices/chatGptSlice";
import {
  fetchChatTitles,
  fetchChatHistory,
} from "../store/slices/chatSanitySlice";

const drawerWidth = 280;
function Chatbot(props) {
  const chatData = useSelector((state) => state.chat);
  const chathistory = useSelector((state) => state.chathistory);
  const { titles, data } = chathistory;
  const [currentChatId, setCurrentChatId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChatTitles());
  }, []);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSearch = () => {
    dispatch(chatCompletion(input, chatData.data, currentChatId));
    // dispatch(fetchChatHistory(currentChatId));
  };
  const handleChat = (e) => {
    dispatch(fetchChatHistory(e));
    setCurrentChatId(e);
  };

  //***Left SideBar Items
  const drawer = (
    <div className="w-full bg-[#202123]">
      <div className="h-14 items-center sticky  top-0 bg-[#202123] flex">
        <div className="flex items-center rounded-md text-white w-3/4 border h-10 mx-2 border-white/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-6 mx-3 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>

          <h1 className="text-sm">New chat</h1>
        </div>

        <div className="flex items-center justify-center rounded-md text-white border w-1/5 h-10 mx-2 border-white/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 md:block hidden"
            onClick={toggleSidebar}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
      <List
        component="nav"
        aria-label="mailbox folders"
        sx={{ width: "100%", borderWidth: 0 }}
      >
        {titles.map((e) => {
          return (
            <ListItem
              key={e._id}
              onClick={() => handleChat(e._id)}
              className=" rounded-xl   h-10 hover:bg-gray-800"
              sx={{ width: "90%", margin: "4px auto" }}
            >
              <ChatBubbleIcon className="text-white mx-2 " />
              <ListItemText
                primary={e.title}
                className="text-white text-xs cursor-pointer "
              />
            </ListItem>
          );
        })}
      </List>

      <div className="h-32"></div>
      <div className="h-32 border-t-2 sticky w-[280px] bg-[#202123] bottom-0">
        <div className="h-full fixed w-full">
          {/* <h1 className="text-white">Hello</h1> */}
        </div>
      </div>
    </div>
  );
  // ***Left SideBar Items Ends

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <Box
        sx={{ display: "flex", gap: 0 }}
        className="bg-rightQ min-h-full  w-full"
      >

<div className="hidden items-center md:flex my-2 justify-center rounded-md text-white border w-10 h-10 mx-2 border-white/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 md:block hidden"
            onClick={toggleSidebar}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>

        {/* Left SideBar */}
        <Box
          // component="nav"
          className={`h-screen fixed transform transition-transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full "
          }`}
          sx={{
            width: {
              md: sidebarOpen ? drawerWidth : "0",
            },
            borderRight: 0,
          }}
          aria-label="mailbox folders"
        >
          {/* Mobile Sidebar */}
          <Drawer
            // className="h-full"
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          {/* Mobile SideBar Ends */}

          {/* Desktop SideBar */}
          <Drawer
            variant="permanent"
            className="h-full"
            sx={{
              display: { xs: "none", md: "block", borderRight: 0 },

              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: {
                  md: sidebarOpen ? drawerWidth : "0",
                },
                backgroundColor: "#202123",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
          {/* Desktop SideBar Ends */}
        </Box>
        {/* Left SideBar Ends */}

        {/* Content Starts */}

        <Box
          component="main"
          sx={{
            marginLeft: { md: sidebarOpen ? `${drawerWidth}px` : "0px" },
          }}
          className={`transition-width ease-in-out duration-300 relative w-full min-h-full bg-rightQ`}
        >
          <div className="relative w-full  pb-10 m-auto bg-rightQ">
            {data &&
              data.map((e) => {
                return (
                  <div key={e.key} className="w-full">
                    <div className="min-w-screen bg-rightQ">
                      <div className="md:py-6 md:max-w-3xl  w-full m-auto text-white">
                        {e.question}
                      </div>
                    </div>

                    <div className="min-w-screen bg-rightA">
                      <div className="md:py-6  m-auto md:max-w-3xl  w-full text-white ">
                        {e.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="sticky bottom-0  h-48 flex  justify-center w-full bg-rightQ">
            <div className="justify-center h-16 fixed bottom-14 md:w-3/5 w-4/5 items-center flex">
              <input
                className=" h-full border-2 w-full bg-transparent text-white search-bar"
                type="search"
                placeholder="Enter"
                onChange={handleChange}
              />
              <button
                className="border-2 text-lg h-full bg-white"
                onClick={handleSearch}
              >
                Submit
              </button>
            </div>
          </div>
        </Box>
        {/* Content Ends      */}

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
    </>
  );
}

Chatbot.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Chatbot;
