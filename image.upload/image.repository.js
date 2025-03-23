import { getDB } from "../config/mongodb.js";
import ApplicationError from "../error-handler/ApplicationError.js";

class ImageRepository{
    constructor(){
        this.collection="images";
    }
    async add(newImage){
        try{
      const db=getDB();
     const collection=db.collection(this.collection);
     await collection.insertOne(newImage);
     return newImage;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went with data");
        }
    }
    async getAll(){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const images = await collection.find().toArray();
            console.log(images);
            return images;
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}
export default ImageRepository;