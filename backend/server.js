import "./env.js";
import  express from 'express';
import  userRouter from './user/user.routes.js';
import bodyParser from 'body-parser';   
import jwtAuth from './middleware/jwt.middleware.js';
// import imageRouter from './image.upload/image.routes.js';
// import {connectToMongoDB} from './config/postgreSQL.js';
import ApplicationError from './error-handler/ApplicationError.js';
const server=express();

server.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:5500');
    res.header('Access-Control-Allow-Headers','*');
    res.header('Access-Control-Allow-Methods','*');
    // return ok for preflight request.
    if(req.method=="OPTIONS"){
      return res.sendStatus(200);
    }
    next();
  })
server.use(bodyParser.json());
// server.use('/api/images',imageRouter);
server.use('/api/users', userRouter);
server.get("/",(req,res)=>{
    res.send("Welcome to College Magazine");
});
//error handler middleware
server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    res.status(500).send('something went wrong please try later');
})
server.use((req,res)=>{
    res.status(404).send("API not found");
})
server.listen(3200,()=>{
    console.log("Server is running on port 3200");
});

