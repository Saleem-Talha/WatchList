import * as yup from "yup";

const Type = ["movie", "series", "anime"];
const Status = ["planned", "watching", "watched"];

export const mediaItemSchema = yup.object({
    title: yup.string().required("Title is required").min(1, "Title must be at least 1 character").max(200, "Title can be at most 200 characters"),
    type: yup.string().oneOf(Type, `Type must be one of: ${Type.join(", ")}`).required("Type is required"),
    notes: yup.string().max(1000, "Notes can be at most 1000 characters"),
    imgUrl: yup.string().url("Image URL must be a valid URL").max(500, "Image URL can be at most 500 characters"),
    status: yup.string().oneOf(Status, `Status must be one of: ${Status.join(", ")}`).default("planned")
})


