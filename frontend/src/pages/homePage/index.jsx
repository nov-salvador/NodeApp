import { Box, useMediaQuery } from "@mui/material";
import React from "react"
import Navbar from "../navbar";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget"
import { useSelector } from "react-redux";
import PostsWidget from "../widgets/PostsWidget";
import AdWidget from "../widgets/AdWidget";
import FriendlistWidget from "../widgets/FriendlistWidget";

function HomePage(){

  const isNonMobileScreens = useMediaQuery("(min-width:1024px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
  <Box>
    <Navbar></Navbar>
    <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdWidget />
            <Box m="2rem 0" />
            <FriendlistWidget userId={_id} />
          </Box>
        )}
    </Box>
  </Box>
  )
}
export default HomePage;