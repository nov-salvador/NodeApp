import React, { useEffect } from "react"
import { useState } from "react";
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery, Divider } from "@mui/material";
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close} from '@mui/icons-material';
import { useDispatch, useSelector} from 'react-redux';
import { setMode, setLogout} from '../../state';
import { useNavigate } from 'react-router-dom';
import FlexBetween from "../../components/FlexBetween";
import UserImg from "../../components/UserImg";

function Navbar(){
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1024px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const [searchItem, setSearchItem] = useState('')
  const [isSearch, setIsSearch] = useState(false);
  const token = useSelector((state) => state.token);
  const [searchResult, setSearchResult] = useState(null)


  const fullname = `${user.firstname} ${user.lastname}`;
  // const fullname = 'Nelo';

  async function handlSearch(){
    if(searchItem === "") {setIsSearch(false); return}
    const request = await fetch(`https://kamarites.onrender.com/search?searchedItem=${searchItem}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    setSearchResult(response);
    setIsSearch(true);
  };

  async function handleChange(event){
    setSearchItem(event.target.value); 
    if(event.target.value === ""){
      setIsSearch(false)
    }
  };
 

  return (
    <FlexBetween padding = "1rem 6%" backgroundColor = {alt} >
      <FlexBetween gap="1.75rem">
        <Typography 
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick = {() => navigate("/home")}
          sx={{
            "&:hover":{
              color: primaryLight,
              cursor: 'pointer',
            },
          }}
        >
          KaMarites
        </Typography>
        {isNonMobileScreens && (<FlexBetween flexDirection="column">
          <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="4rem" padding="0.1rem 1.5rem">
            <Box>
              <InputBase placeholder="Search..." onChange={(e) => {handleChange(e)}}/>
            </Box>
            
            <IconButton>
              <Search onClick={handlSearch}/>
            </IconButton>
            
          </FlexBetween>
          <Box position="absolute" top="3.5rem" zIndex="11" width="15rem" backgroundColor={neutralLight} borderRadius="19px">
          {isSearch && (
              <Box> 
                {searchResult.length ===0 ? (<Typography padding=".5rem 1rem">No User Found</Typography>) 
                : 
                (searchResult.map((item, i) => (
                <FlexBetween key={i} justifyItems="center" flexDirection="column">
                  <FlexBetween 
                  gap="3rem" 
                  margin=".4rem" 
                  onClick={() => {navigate(`/profile/${item._id}`);navigate(0)}}
                  sx={{
                    "&:hover": {cursor: "pointer"}
                  }}
                  >
                    <UserImg image={item.picturePath} size="30px"></UserImg>
                    <Typography>{`${item.firstname} ${item.lastname}`}</Typography>
                  </FlexBetween>
                  <Divider width="80%"/>
                </FlexBetween>)))}
              </Box>
            )}
        </Box>
        </FlexBetween>
        )}
      </FlexBetween>
      {isNonMobileScreens ? 
      (<FlexBetween gap="2rem">
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === 'dark' ? 
            (<DarkMode sx={{ fontSize: "25px"}}/>) : 
            (<LightMode sx={{ fontSize: "25px", color: dark}}/>)
          }
        </IconButton>
        <Message sx={{ fontSize: "25px"}}/>
        <Notifications sx={{ fontSize: "25px"}}/>
        <Help sx={{ fontSize: "25px"}}/>
        <FormControl variant="standard" value={fullname}>
          <Select
            value={fullname}
            sx={{
              backgroundColor: neutralLight,
              width: "150px",
              borderRadius: ".25rem",
              padding: ".25rem 1rem",
              "& .MuiSvgIcon-root":{
                pr: ".25rem",
                width: "3rem"
              },
              "& .MuiSelect-select:focus": {
                backgroundColor: neutralLight,
              }
            }}
            input={<InputBase></InputBase>}
          >
            <MenuItem value={fullname}>
              <Typography>{fullname}</Typography>
            </MenuItem>
            <MenuItem onClick={() => dispatch(setLogout())}>
              Log Out
            </MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>) : 
      (<IconButton
        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu/>
      </IconButton>)
      }

      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          <Box display="flex" justifyContent="flex-end" padding="1rem">
            <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close/>
            </IconButton>
          </Box>

          <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
            <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: "25px"}}>
              {theme.palette.mode === 'dark' ? 
                (<DarkMode sx={{ fontSize: "25px"}}/>) : 
                (<LightMode sx={{ fontSize: "25px", color: dark}}/>)
              }
            </IconButton>
            <Message sx={{ fontSize: "25px"}}/>
            <Notifications sx={{ fontSize: "25px"}}/>
            <Help sx={{ fontSize: "25px"}}/>
            <FormControl variant="standard" value={fullname}>
              <Select
                value={fullname}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: ".25rem",
                  padding: ".25rem 1rem",
                  "& .MuiSvgIcon-root":{
                    pr: ".25rem",
                    width: "3rem"
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  }
                }}
                input={<InputBase></InputBase>}
              >
                <MenuItem value={fullname}>
                  <Typography>{fullname}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  )
}
export default Navbar;