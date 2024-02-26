import React from "react"
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form  from "../../components/Form";

function LoginPage(){
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("min-width: 1024px")

  return (
    <Box>
      <Box width="100%" backgroundColor={theme.palette.background.alt} padding="1rem 6%" textAlign="center">
        <Typography 
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          sx={{
            "&:hover":{
              color: "primary",
              cursor: 'pointer',
              scale:"1.1"
            },
          }}
        >
          KaMarites
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "60%"}
        padding="2rem"
        margin="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="600" variant="h5" mb="1.5rem">
          Hello there! Ready to dive back into your world? Log in to connect, share, and explore.
        </Typography>
        <Form/>
      </Box>
    </Box>
  )
}
export default LoginPage;
