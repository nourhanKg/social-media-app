import CardWrapper from "components/CardWrapper";
import UserImage from "components/UserImage";
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Flexbox from "components/FlexBox";

const UserCard = function({userId, picturePath}) {
    const [user, setUser] = useState(null);
    const {palette} = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const getUserInfo = async function() {
        const res = await fetch(`http://localhost:9001/users/${userId}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        const data = await res.json();
        console.log(data);
        setUser(data.data);
    }
    useEffect(() => {
        getUserInfo();
    }, []);
    if(!user) {
        return null;
    }
    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
      } = user; 
    return (
        <CardWrapper>
            <Flexbox gap="0.5rem" pb="1rem" onClick={() => navigate(`/profile/${userId}`)}>
                <UserImage image={picturePath}></UserImage>
                <Box>
                    <Typography variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}>
                        {firstName} {lastName}
                    </Typography>
                    <Typography color={medium}>
                        {friends.length} friends
                    </Typography>
                </Box>
                <ManageAccountsOutlined></ManageAccountsOutlined>
                </Flexbox>
                <Divider/>
                <Box p="1rem 0">
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <LocationOnOutlined fontSize="large" sx={{ color: main }} ></LocationOnOutlined>
                        <Typography color={medium}>
                            {location}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap="1rem">
                        <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                        <Typography color={medium}>{occupation}</Typography>
                    </Box>
                </Box>
                <Box p="1rem 0">
                    <Flexbox mb="0.5rem">
                    <Typography color={medium}>Who's viewed your profile</Typography>
                    <Typography color={main} fontWeight="500">
                        {viewedProfile}
                    </Typography>
                    </Flexbox>
                    <Flexbox>
                    <Typography color={medium}>Impressions of your post</Typography>
                    <Typography color={main} fontWeight="500">
                        {impressions}
                    </Typography>
                    </Flexbox>
                </Box>
                <Box p="1rem 0">
                    <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                    </Typography>

                    <Flexbox gap="1rem" mb="0.5rem">
                    <Flexbox gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                        <Typography color={main} fontWeight="500">
                            Twitter
                        </Typography>
                        <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </Flexbox>
                    <EditOutlined sx={{ color: main }} />
                    </Flexbox>

                    <Flexbox gap="1rem">
                    <Flexbox gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                        <Typography color={main} fontWeight="500">
                            Linkedin
                        </Typography>
                        <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </Flexbox>
                    <EditOutlined sx={{ color: main }} />
                    </Flexbox>
                </Box>
        </CardWrapper>
    )
}
export default UserCard