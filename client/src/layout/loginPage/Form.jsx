import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login} from "store";
import Dropzone from "react-dropzone";
import Flexbox from "components/FlexBox";

const registrationSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required")
});
const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const registrationInitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: ""
};
const loginInitialValues = {
    email: "",
    password: "",
};
const Form = function() {
    const [formType, setFormType] = useState("login");
    const {palette} = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobilescreen = useMediaQuery("(max-width: 772px");
    const isLogin = formType === "login";
    const isRegister = formType === "register";
    const handleFormSubmit = async function(values, onSubmitProps) {
        if(isLogin) {
            startLogin(values, onSubmitProps);
        }
        if(isRegister) {
            startRegister(values, onSubmitProps);
        }
    }
    const startRegister = async function(values, onSubmitProps) {
        const formData = new FormData();
        for(let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);
        const res = await fetch("http://localhost:9001/auth/register", {
            method: "POST",
            body: formData
        });
        const newUser = await res.json();
        onSubmitProps.resetForm();
        if(newUser) {
            setFormType("login");
        }
    }
    const startLogin = async function(values, onSubmitProps) {
        const res = await fetch("http://localhost:9001/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        });
        const loggedIn = await res.json();
        onSubmitProps.resetForm();
        if(loggedIn) {
            dispatch(login({
                user: loggedIn.user,
                token: loggedIn.token
            }));
            navigate("/home");
        }
    }
    return (
        <Formik onSubmit={handleFormSubmit} initialValues={isLogin ? loginInitialValues : registrationInitialValues} validationSchema={isLogin? loginSchema : registrationSchema}>
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (<form onSubmit={handleSubmit}>
                <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{
                    "& > div": {gridColumn: isMobilescreen ? "span 4" : "span 2"}
                }}>
                    {isRegister && (
                        <>
                            <TextField label="First Name" onBlur={handleBlur} onChange={handleChange} value={values.firstName} name="firstName" error={Boolean(touched.firstName) && Boolean(errors.firstName)} helperText={touched.firstName && errors.firstName}/>
                            <TextField label="Last Name" onBlur={handleBlur} onChange={handleChange} value={values.lastName} name="lastName" error={Boolean(touched.lastName) && Boolean(errors.lastName)} helperText={touched.lastName && errors.lastName}/>
                            <TextField label="Location" onBlur={handleBlur} onChange={handleChange} value={values.location} name="location" error={Boolean(touched.location) && Boolean(errors.location)} helperText={touched.location && errors.location}/>
                            <TextField label="Occupation" onBlur={handleBlur} onChange={handleChange} value={values.occupation} name="occupation" error={Boolean(touched.occupation) && Boolean(errors.occupation)} helperText={touched.occupation && errors.occupation}/>
                            <Box gridColumn="span 4" border={`1px solid ${palette.neutral.medium}`} borderRadius="5px" p="1rem">
                                <Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false} onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}>
                                    {({getRootProps, getInputProps}) => (<Box {...getRootProps()} border={`2px dashed ${palette.primary.main}`} p="1rem" sx={{
                                        "&:hover": {
                                            cursor: "pointer"
                                        }
                                    }}>
                                        <input {...getInputProps()}/>
                                        {
                                            !values.picture ? (<p>Add Picture Here.</p>): (<Flexbox>
                                                <Typography>
                                                    {values.picture.name}
                                                </Typography>
                                                <EditOutlinedIcon/>
                                            </Flexbox>)
                                        }
                                    </Box>)}
                                </Dropzone>
                            </Box>
                        </>
                    )}
                    <TextField label="Email" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" error={Boolean(touched.email) && Boolean(errors.email)} helperText={touched.email && errors.email}/>
                    <TextField label="Password" type="password" onBlur={handleBlur} onChange={handleChange} value={values.password} name="password" error={Boolean(touched.password) && Boolean(errors.password)} helperText={touched.password && errors.password}/>
                </Box>
                {/* Buttons */}
                <Box>
                    <Button type="submit" fullWidth sx={{p: "1rem", m: "2rem 0", backgroundColor: palette.primary.main, color: palette.background.alt, "&:hover": {
                        color: palette.primary.main
                    }}}>
                        {isLogin ? "Login" : "Register"}
                    </Button>
                    <Typography onClick={() => setFormType(isLogin ? "register" : "login")} sx={{
                        textDecoration: "underline",
                        color: palette.primary.main,
                        "&:hover": {
                            cursor: "pointer",
                            color: palette.primary.light
                        }
                    }}>
                        {isLogin? "Don't have an account? sign Up Now" : "Already have an account? Log In"}
                    </Typography>
                </Box>
            </form>)}
        </Formik>
    )
}
export default Form;