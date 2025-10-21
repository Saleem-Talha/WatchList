import {Router} from "express";
import {plannedParamsSchema,createPlannedBodySchema,updatePlannedBodySchema,listPlannedQuerySchema} from "../validators/planned.validator.js";
import {validate} from "../middleware/validate.js";
import {getReminders, createReminder, updateReminder, deleteReminder, getReminderById} from "../controllers/planned.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();
router.use(auth);
router.get("/", validate({query:listPlannedQuerySchema}),getReminders);
router.post("/", validate({body:createPlannedBodySchema}), createReminder);
router.put("/:id", validate({params: plannedParamsSchema, body: updatePlannedBodySchema}), updateReminder);
router.delete("/:id", validate({params: plannedParamsSchema}), deleteReminder);
router.get("/:id", validate({params: plannedParamsSchema}), getReminderById);


export default router;