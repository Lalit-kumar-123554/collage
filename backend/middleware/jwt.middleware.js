import jwt from 'jsonwebtoken';
const jwtAuth =(req,res,next)=>{
   
    const token=req.headers['Authorization'];
    console.log(token);
    if(!token){
        return res.status(401).send('Unauthorized');
    }
    try{
       const payload= jwt.verify(token,"Vsa2U1ghsya5SKMgzIBE0MKWExb23nD7");
    
    console.log(payload);
    }catch(err){
         console.log(err);
        return res.status(401).send("Unauthorized");
    }
    next();
};
export default jwtAuth;
