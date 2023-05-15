import { Typography, useTheme } from "@mui/material";
import CardWrapper from "components/CardWrapper";
import Flexbox from "components/FlexBox";
const AdvCard = function(){
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <CardWrapper>
      <Flexbox>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </Flexbox>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:9001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <Flexbox>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </Flexbox>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </CardWrapper>
  );
};

export default AdvCard;
