import userModel from '../model/user_model'
import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const verifyToken = async (request: Request,response: Response,next: NextFunction) => {
    try {
        let secretKey: any = process.env.SECRETE_KEY 
        let token: any = request.headers['authorization']?.split(" ")[1];
            let {userId} : any = jwt.verify(token, secretKey);
            let user = await userModel.findOne({_id:userId, isAdmin: false});
            request.user = user;
            if(request.user){
                next();
            }
            else{
                response.json({message: "Invalide user"})
            }
    } catch (error) {
        return response.status(500).json({message: "Invalide token"})
    }
}