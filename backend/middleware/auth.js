import jwt from "jsonwebtoken";
 export function authMiddleware(req, res, next){
    const token = req.headers.authorization?.split(" ")[1]; // cheacks for bearer token
    if(!token){
        return res.status(401).json({message:"No token provided"});
    }else{
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach user info to request object
            next();
        }catch(err){
            res.status(401).json({message:"Invalid token"});
        }
    }
 }

 export {authMiddleware as auth};