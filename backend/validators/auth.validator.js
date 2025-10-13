import * as yup from "yup";

export const registerSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    username: yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(80, "Username can be at most 80 characters")
})

export const loginSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required")
})