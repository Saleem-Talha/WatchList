import {Router} from "express";
import {mediaItemSchema,listQuery,updateItemBody,itemIdParams} from "../validators/mediaItem.validator.js";
import {validate} from "../middleware/validate.js";
import {getMediaItems, createMediaItem, updateItem, deleteItem, getItemById, getItemByPlannedStatus} from "../controllers/mediaItem.controller.js";
import { auth } from "../middleware/auth.js";

const planRouter = Router();
planRouter.use(auth);
planRouter.get("/", validate({query:listQuery}),getMediaItems);
planRouter.post("/", validate({body:mediaItemSchema}), createMediaItem);
planRouter.put("/:id", validate({params: itemIdParams, body: updateItemBody}), updateItem);
planRouter.delete("/:id", validate({params: itemIdParams}), deleteItem);
planRouter.get("/:id", validate({params: itemIdParams}), getItemById);
planRouter.get("/status/planned",validate({query:listQuery}), getItemByPlannedStatus);

export default planRouter;