import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://kamarites.onrender.com/assets/info4.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Axel Motors</Typography>
        <Typography color={medium}>axelmotors.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        "Experience the thrill of the road with our cutting-edge automotive solutions. From sleek designs to advanced technology, our vehicles redefine performance, style, and safety. Embark on your journey with us and discover the joy of driving like never before."
      </Typography>
    </WidgetWrapper>
  );
};

export default AdWidget;