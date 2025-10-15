import {Router} from "express";
import {mediaItemSchema,listQuery,updateItemBody,itemIdParams} from "../validators/mediaItem.validator.js";
import {validate} from "../middleware/validate.js";
import {getMediaItems, createMediaItem, updateItem, deleteItem, getItemById} from "../controllers/mediaItem.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();
router.use(auth);
router.get("/", validate({query:listQuery}),getMediaItems);
router.post("/", validate({body:mediaItemSchema}), createMediaItem);
router.put("/:id", validate({params: itemIdParams, body: updateItemBody}), updateItem);
router.delete("/:id", validate({params: itemIdParams}), deleteItem);
router.get("/:id", validate({params: itemIdParams}), getItemById);

export default router;