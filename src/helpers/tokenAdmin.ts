import userModel from '../model/user_model'
import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            admin?: any;
        }
    }
}

export const tokenAdmin = async (req: Request,res: Response,next: NextFunction) => {
    try {
        let secretKey: any = process.env.SECRETE_KEY 
            let token: any = req.headers['authorization']?.split(" ")[1];
                let {userId} : any = jwt.verify(token, secretKey);
                let user = await userModel.findOne({_id: userId, isAdmin: true});
                req.admin = user;
                if(req.admin){
                    next();
                }
                else{
                    res.json({message: "Invalide admin"})
                }
    } catch (error) {
        return res.status(500).json({message: "internal Server Error"})
    }
}