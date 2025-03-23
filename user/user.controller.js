import UserModel from './user.model.js';
import jwt from 'jsonwebtoken';
import UserRepository from './user.repository.js';
import bcrypt from "bcrypt";
export default class UserController {
    constructor(){
    this.userRepository=new UserRepository();
    }
  async signUp(req, res) {
    const {
      name,
      email,
      password,
      type,
    } = req.body;
    const hashedPassword= await bcrypt.hash(password,12)
    const user = new  UserModel(
      name,
      email,
      hashedPassword,
      type
    );
    await this.userRepository.signUp(user);
    res.status(201).send(user);
  }

   async signIn(req, res,next) {
    try{
      const user=await this.userRepository.findByEmail(req.body.email);
      if(!user){
        return res.status(400).send('Incorrect credentails');
      }else{
       const result=await bcrypt.compare( req.body.password,user.Password);
        if(result){
          const token = jwt.sign(
            {
              userID: result.id,
              email: result.email,
            },
           process.env.JWT_SECRET,
            {
              expiresIn: '17day',
            }
          );  
          // 2. Send token.
          return res.status(200).send(token);
        }else{
          return res.status(400).send('Incorrect credentails');
        }
      } 
  }catch(err){
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
   }
}
