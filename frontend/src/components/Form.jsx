import { useState } from "react";
import {Box, Button, TextField, useMediaQuery, Typography, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import Dropzone from 'react-dropzone';
import FlexBetween from "./FlexBetween";

const registerSchema = yup.object().shape({
  firstname: yup.string().required("required"),
  lastname: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
  bio: yup.string().max(100,"exceeded max length"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
  bio: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

function Form(){
  const [pageType, setPageType] = useState("login");
  const {palette} = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("min-width: 600px");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  async function register(values, onSubmitProps){
    //allow to sumit form data with picture
    const formData = new FormData();
    for(let value in values){
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    try{
      const savedUserResponse = await fetch("http://localhost:3000/auth/register", {method: "POST", body: formData});
      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();

      if(savedUser){
        setPageType("login")
      };
    }catch(err){
      console.error(err.message)
    }
  };

  async function login(values, onSubmitProps){
    try{
      const loggedInResponse = await fetch("http://localhost:3000/auth/login", {method: "POST", body: JSON.stringify(values), headers:{"Content-Type":"application/json"}});
      const loggedIn = await loggedInResponse.json();
      
      onSubmitProps.resetForm();

      if(loggedIn){
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        );
        navigate("/home")
      };

    }catch(err){
      console.error(err.message)
    }
  }

  async function handleFormSubmit(values, onSubmitProps){
    if (isLogin){
      await login(values, onSubmitProps)
    };
    if (isRegister){
      await register(values, onSubmitProps)
      window.alert("Successful")
    };
  };

  return (
  <Formik
    onSubmit={handleFormSubmit}
    initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
    validationSchema={isLogin ? loginSchema : registerSchema}
  >
    {({
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      setFieldValue,
      resetForm,
    }) => (
      <form onSubmit={handleSubmit}> 
        <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": {gridColumn: isNonMobile ? undefined : "span 4"}
        }}
        >
          {isRegister && (
            <>
              <TextField
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstname}
                name = "firstname"
                error = {Boolean(touched.firstname) && Boolean(errors.firstname)}
                helperText = { touched.firstname && errors.firstname}
                sx={{ gridColumn: "span 2"}}
              />
              <TextField
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastname}
                name = "lastname"
                error = {Boolean(touched.lastname) && Boolean(errors.lastname)}
                helperText = { touched.lastname && errors.lastname}
                sx={{ gridColumn: "span 2"}}
              />
              <TextField
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name = "location"
                error = {Boolean(touched.location) && Boolean(errors.location)}
                helperText = { touched.location && errors.location}
                sx={{ gridColumn: "span 4"}}
              />
              <TextField
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name = "occupation"
                error = {Boolean(touched.occupation) && Boolean(errors.occupation)}
                helperText = { touched.occupation && errors.occupation}
                sx={{ gridColumn: "span 4"}}
              />
              <TextField
                label="Bio"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.bio}
                name = "bio"
                error = {Boolean(touched.bio) && Boolean(errors.bio)}
                helperText = { touched.bio && errors.bio}
                sx={{ gridColumn: "span 4"}}
              />
              <Box
                gridColumn="span 4"
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                padding="1rem"
              >
                <Dropzone
                  acceptedFiles=".jpeg, .jpg, .png"
                  multiple={false}
                  onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
                >
                  {({getRootProps, getInputProps}) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      padding="1rem"
                      sx={{
                        "&:hover": {cursor: "pointer"}
                      }}
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (<p>Add Picture Here</p>) : 
                      (
                        <FlexBetween>
                          <Typography>
                            {values.picture.name}
                          </Typography>
                          <EditIcon/>
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
            </>
          )}

          <TextField
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name = "email"
            error = {Boolean(touched.email) && Boolean(errors.email)}
            helperText = { touched.email && errors.email}
            sx={{ gridColumn: "span 4"}}
          />       
          <TextField
          label="Password"
          type="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          name = "password"
          error = {Boolean(touched.password) && Boolean(errors.password)}
          helperText = { touched.password && errors.password}
          sx={{ gridColumn: "span 4"}}
          /> 

        </Box>
        <Box>
          <Button
            fullWidth
            type="submit"
            sx={{
              margin:"2rem 0",
              padding: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": {color: palette.primary.main}
            }}
          >
            {isLogin ? "LOGIN" : "REGISTER"}
          </Button>
          <Typography
            onClick={() => {
              setPageType(isLogin ? "register" : "login");
              resetForm();
            }}
            sx={{
              textDecoration: "underline",
              color: palette.primary.main,
              "&:hover": {
                cursor: "pointer",
              }
            }}
          >
            {isLogin ? "Don't have an account? Sign up here" : "Already have an account? Log in here"}
          </Typography>
        </Box>
      </form>
    )}
  </Formik>)
  


}

export default Form;