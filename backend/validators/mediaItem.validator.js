import * as yup from "yup";
import { objectId } from "../middleware/validate.js";
const Type = ["movie", "series", "anime"];
const Status = ["planned", "watching", "watched"];

export const mediaItemSchema = yup.object({
    title: yup.string().required("Title is required").min(1, "Title must be at least 1 character").max(200, "Title can be at most 200 characters"),
    type: yup.string().oneOf(Type, `Type must be one of: ${Type.join(", ")}`).required("Type is required"),
    notes: yup.string().max(1000, "Notes can be at most 1000 characters"),
    imgUrl: yup.string().url("Image URL must be a valid URL").max(500, "Image URL can be at most 500 characters"),
    status: yup.string().oneOf(Status, `Status must be one of: ${Status.join(", ")}`).default("planned")
})

export const listQuery = yup.object({
  type: yup.mixed().oneOf(Type).optional(),
  status: yup.mixed().oneOf(Status).optional(),
  q: yup.string().trim().max(200).optional(),
  page: yup.number().transform(v => (isNaN(v) ? undefined : v)).min(1).default(1).optional(),
  limit: yup.number().transform(v => (isNaN(v) ? undefined : v)).min(1).max(50).default(10).optional(),
});

export const updateItemBody = yup.object({
  title: yup.string()
            .transform(v => (typeof v === "string" ? v.trim() : v))
            .max(200, "Title can be at most 200 characters")
            .test("not-empty-when-present", "Title cannot be empty", v => v === undefined || v.length > 0)
            .optional(),
  type: yup.string().oneOf(Type, `Type must be one of: ${Type.join(", ")}`).optional(),
  notes: yup.string().trim().max(1000, "Notes can be at most 1000 characters").optional(),
  imgUrl: yup.string().trim().url("Image URL must be a valid URL")
             .max(50000, "Image URL can be at most 500 characters").optional(),
  status: yup.string().oneOf(Status, `Status must be one of: ${Status.join(", ")}`).optional(),
});

export const itemIdParams = yup.object({
  id: objectId().required(),
});