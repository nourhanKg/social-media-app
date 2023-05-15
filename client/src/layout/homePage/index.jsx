import Navbar from "components/Navbar"
import { Box, useMediaQuery
 } from "@mui/material"
import { useSelector } from "react-redux";
import UserCard from "layout/cards/userCard";
import AddPostCard from "layout/cards/addPostCard";
import Posts from "layout/cards/posts";
import AdvCard from "layout/cards/advCard";
import FriendsList from "layout/cards/friendsCard";
const HomePage = function() {
    const isMobileScreen = useMediaQuery("(max-width: 992px)");
    const {_id, picturePath} = useSelector((state) => state.user)
    // const state = useSelector((state) => state);

    // console.log(state, picturePath)
    return (
        <Box>
            <Navbar></Navbar>
            <Box width="100%"
            padding="2rem 6%"
            display={isMobileScreen ? "block" : "flex"}
            gap="0.5rem"
            justifyContent="space-between">
                <Box flexBasis={!isMobileScreen ? "26%" : undefined}>
                    <UserCard userId={_id} picturePath={picturePath}></UserCard>
                </Box>
                <Box
                flexBasis={!isMobileScreen ? "42%" : undefined}
                mt={!isMobileScreen ? undefined : "2rem"}
                >
                <AddPostCard picturePath={picturePath} />
                <Posts userId={_id} />
            </Box>
                {!isMobileScreen && (
                <Box flexBasis="26%">
                    <AdvCard />
                    <Box m="2rem 0" />
                    <FriendsList userId={_id} />
                </Box>
                )}
            </Box>
        </Box>
    )
}
export default HomePage