import {Router} from "express";
import {validate} from "../middleware/validate.js";
import {registerSchema, loginSchema} from "../validators/auth.validator.js";
import {register, login} from "../controllers/auth.controller.js";


const authRouter = Router();

authRouter.post("/register", validate({body:registerSchema}),register);
authRouter.post("/login", validate({body:loginSchema}), login);

export default authRouter;