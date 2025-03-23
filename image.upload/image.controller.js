import imageModel from "./image.model.js";
import ImageRepository from "./image.repository.js";
export default class ImageController{
    constructor(){
        this.imageRepository=new ImageRepository();
    }
     async getAllImages(req,res){
        try{
        const images= await this.imageRepository.getAll();
        res.status(200).send(images);
         } catch(err){
          console.log(err);
          return res.status(200).send("Something went wrong");
        }
    }
     async addImage(req,res){
        try{
         const{desc,imageUrl}=req.body; 
         const newImage={ desc,imageUrl:req.file.filename };
            const createdrecored= imageModel.add(newImage);
            res.status(201).send(createdrecored);
         }catch(err){
           
            return res.status(200).send("something went wrong"); 
         }
        // console.log(req.body);
        // console.log(" this is a post request");
        // res.status(200).send("post request received");
    }
    getOneImage(req,res){
        const id=req.params.id;
         const image=imageModel.get(id);
         if(!image){
            res.status(404).send("Image not found");
         }else{
            return res.status(200).send(image);
         }
    }
}
