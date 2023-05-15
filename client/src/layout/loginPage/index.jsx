import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
const LoginPage = function() {
    const theme = useTheme();
    const isMobileScreen = useMediaQuery("(max-width: 992px)");
    const alt = theme.palette.background.alt;
    return (
        <Box>
            <Box width="100%" backgroundColor={alt} p="1rem 5%">
                <Typography fontWeight="bold" fontSize="32px" color="primary">
                    Social
                </Typography>
                
            </Box>
            <Box width={isMobileScreen? "50%" : "93%"} p="2rem" m="2rem auto" borderRadius="1.5rem" backgroundColor={theme.palette.background.alt}>
                <Typography fontWeight="500" variant="h5" sx={{
                    mb: "1.5rem"
                }}>
                    Welcome to Social, the best social media platform!
                </Typography>
                <Form></Form>
            </Box>
        </Box>
    )
}
export default LoginPage;