import { Typography, Box, IconButton, InputBase, Select, MenuItem, FormControl, useTheme, useMediaQuery } from "@mui/material";
import {
    Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close
} from "@mui/icons-material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, logout } from "store";
import { useNavigate } from "react-router-dom";
import Flexbox from "./FlexBox";
const Navbar = function() {
    const [isCollapsedMenu, setIsCollapsedMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const state = useSelector((state) => state);
    // console.log(state);
    const user = useSelector((state) => state.user);
    const isMobileScreen = useMediaQuery("(max-width: 992px)");
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const userName = `${user?.firstName} ${user?.lastName}`;
    return (
        <Flexbox padding="1rem 5%" backgroundColor={alt}>
            <Flexbox gap="1.5rem">
                {/* Logo */}
                <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)"color="primary" onClick={() => navigate("/home")} sx={{
                    "&hover": {
                        color: primaryLight,
                        cursor: "pointer"
                    }
                }}>
                    Social
                </Typography>
                {/* Search Bar */}
                {!isMobileScreen && (
                    <Flexbox backgroundColor={neutralLight} borderRadius="10px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase placeholder="Search"></InputBase>
                        <IconButton>
                            <Search></Search>
                        </IconButton>
                    </Flexbox>
                )}
            </Flexbox>
            {/* Desktop Nav*/}
            {!isMobileScreen ? (<Flexbox gap="2rem">
                    <IconButton onClick={() => dispatch(toggleTheme())}>
                        {theme.palette.theme === "Dark" ? (<DarkMode></DarkMode>): (<LightMode sx={{color: dark}}></LightMode>)}
                    </IconButton>
                    <Message></Message>
                    <Notifications></Notifications>
                    <Help></Help>
                    {user? (<FormControl variant="standard" value={userName}>
                        <Select value={userName} sx={{backgroundColor: neutralLight, width: "150px", borderRadius: "0.25rem", p: "0.25rem 1rem", "& .MuiSvgicon-root": {
                            pr: "0.25rem",
                            width: "3rem"
                        }, "& .MuiSelect-select:focus": {
                            backgroundColor: neutralLight
                        }
                        }} input={<InputBase/>} >
                            <MenuItem value={userName}>
                                <Typography>{userName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(logout())}>Log Out</MenuItem>
                        </Select>
                    </FormControl>): ""}
                </Flexbox>) : (<IconButton onClick={()=> setIsCollapsedMenu(!isCollapsedMenu)}>
                    <Menu/>
                </IconButton>)}
                {/* Mobile Nav */}
                {isMobileScreen && isCollapsedMenu && (
                    <Box position="fixed" right="0" bottom="0" height="100%" zIndex="100" maxWidth="500px" minWidth="300px" backgroundColor={background}>
                        {/* Close Icon */}
                        <Box display="flex" justifyContent="flex-end" p="1rem">
                            <IconButton onClick={()=> setIsCollapsedMenu(!isCollapsedMenu)}>
                                <Close/>
                            </IconButton>
                        </Box>
                        {/* Menu Items */}
                        <Flexbox gap="3rem" flexDirection="column" justifyContent="center">
                            <IconButton onClick={() => dispatch(toggleTheme())}>
                                {theme.palette.theme === "Dark" ? (<DarkMode></DarkMode>): (<LightMode sx={{color: dark}}></LightMode>)}
                            </IconButton>
                            <Message></Message>
                            <Notifications></Notifications>
                            <Help></Help>
                            {user ? (<FormControl variant="standard" value={userName}>
                                <Select value={userName} sx={{backgroundColor: neutralLight, width: "150px", borderRadius: "0.25rem", p: "0.25rem 1rem", "& .MuiSvgicon-root": {
                                    pr: "0.25rem",
                                    width: "3rem"
                                }, "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight
                                }
                                }} input={<InputBase/>} >
                                    <MenuItem value={userName}>
                                        <Typography>{userName}</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => dispatch(logout())}>Log Out</MenuItem>
                                </Select>
                            </FormControl>) : ""}
                        </Flexbox>
                    </Box>
                )}
        </Flexbox>
    )
}
export default Navbar;