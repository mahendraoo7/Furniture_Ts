import mongoose from "mongoose";
import express  from "express";
import dotenv from "dotenv";
import userRoute from "./src/routes/user_routes";
import admin from "./src/routes/admin/adminIndex_routes";
import user from "./src/routes/user/userIndex_routes";
const server = express();

dotenv.config({  
    path: './.env'
})

export class DBUtil{
    public static connectToDb(dbUrl: string, dbName: string): Promise<string> {
        return new Promise((resolve, reject)=>{
            mongoose.connect(dbUrl,{
                dbName: dbName  
            })
            .then(() => {
                resolve('MongoDB connected.... !')
            })
            .catch((error) => {
                if(error){
                    console.log(error);
                    reject('MongoDB not connected.... !')
                }
            })
        })
    }
}
const port: Number | undefined = Number(process.env.PORT);  
const dbUrl: string | undefined = process.env.MONGODB_URL;
const dbName: string | undefined = process.env.MONGODB_NAME;

server.use(express.json());

server.use('/api/user', userRoute)
server.use('/api/admin', admin);
server.use('/api/user', user);

if(port && dbUrl && dbName){
    server.listen(port, ()=>{
        if (dbUrl && dbName) {
            DBUtil.connectToDb(dbUrl, dbName).then((dbResponse) => {
                console.log(dbResponse);
            }).catch((error) => {
                console.error(error);
                process.exit(0); // stops the node js process
            });
        }   
        console.log(`Server is running on http://localhost:${port}`);
    })
}