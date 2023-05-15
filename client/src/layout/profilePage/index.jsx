import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "components/Navbar";
import FriendsList from "layout/cards/friendsCard";
import UserCard from "layout/cards/userCard";
import Posts from "layout/cards/posts";
import AddPostCard from "layout/cards/addPostCard";


const ProfilePage = function() {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const token = useSelector((state) => state.token);
    const loggedInUser = useSelector((state) => state.user);
    const isMobileScreen = useMediaQuery("(max-width: 992px)");

  const getUser = async () => {
    const res = await fetch(`http://localhost:9001/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUser(data.data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={!isMobileScreen ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={!isMobileScreen ? "26%" : undefined}>
                <UserCard userId={id} picturePath={user.picturePath} />
                <Box m="2rem 0" />
                {loggedInUser._id === id ? (<FriendsList userId={id} />) : "Friends are private!"}
                </Box>
                <Box
                flexBasis={!isMobileScreen ? "42%" : undefined}
                mt={!isMobileScreen ? undefined : "2rem"}
                >
                { loggedInUser._id === id ? (<AddPostCard picturePath={user.picturePath}/>): ""}
                <Box m="2rem 0" />
                <Posts userId={id} isProfile />
                </Box>
            </Box>
            </Box>
    )
}
export default ProfilePage;