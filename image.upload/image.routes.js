import express from 'express';
import imageController from '../image.upload/image.controller.js';

const imageRouter=express.Router();
const ImageController=new imageController();
imageRouter.get('/',ImageController.getAllImages);
imageRouter.post('/',ImageController.addImage);
imageRouter.get('/:id',ImageController.getOneImage);
export default imageRouter;
