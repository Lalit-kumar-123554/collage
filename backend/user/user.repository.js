import { getDB } from "../config/postgreSQL.js";
import ApplicationError from "../error-handler/ApplicationError.js";

class UserRepository{
  constructor(){
 this.collection="users";
  }
    async signUp(newUser){
    try{
        const db=getDB();
        const connection=db.collection(this.collection);
        await connection.insertOne(newUser);
        return newUser;
    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong",500);
    }
}
async signIn(email, password) {
    try{
      // 1. Get the database
    const db = getDB();
    // 2. Get the collection
    const collection = db.collection(this.collection);
    
    // 3. Find the document.
    return await collection.findOne({email, password});
    } catch(err){
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
async findByEmail(email){
    try{
        const db=getDB();
        const connection=db.collection("users");
      return  await connection.findOne({email});
       
    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong",500);
    }
}
}
export default UserRepository;

