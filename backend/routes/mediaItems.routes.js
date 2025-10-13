import {Router} from "express";
import {mediaItemSchema} from "../validators/mediaItem.validator.js";
import {validate} from "../middleware/validate.js";
import {getMediaItems, createMediaItem, updateItem, deleteItem} from "../controllers/mediaItem.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();
router.use(auth);
router.get("/", validate({body:mediaItemSchema}),getMediaItems);
router.post("/", validate({body:mediaItemSchema}), createMediaItem);
router.put("/:id", validate({body:mediaItemSchema}), updateItem);
router.delete("/:id", validate({body:mediaItemSchema}), deleteItem);

export default router;