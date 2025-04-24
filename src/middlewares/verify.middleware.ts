import { asyncHandler,Response } from "../utils";
import jwt,{JwtPayload} from "jsonwebtoken"
interface DecodedToken extends JwtPayload {
    id:string;
    email:string;
    name:string;

}
const verifyMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json(new Response(401, 'Unauthorized', null));
    }

    if(!process.env.JWT_SECRET) {
        return res.status(500).json(new Response(500, 'Server error', null));
    }
    const decoded =  jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
    if(!decoded) {
        return res.status(401).json(new Response(401, 'Unauthorized', null));
    }
    req.user = {
        id: decoded.id,
        email: decoded.email,
        type: decoded.type,
        name: decoded.name,
    };
    next();


})

export default verifyMiddleware;