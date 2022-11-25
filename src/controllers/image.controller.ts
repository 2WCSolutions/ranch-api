import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { Image } from '../models/image.model';
import { Buffer } from 'node:buffer';

const fs = require('fs');

class ImageController implements Controller {
    public path = '/images';
    public router = Router();
   
    public getAllImages = async (request: Request, response: Response) => {
      
      // careful careful
      // await image.deleteMany({});
  
      let images = await Image.find()
        .sort({ "lastModifiedDate": -1 });
  
      return response.status(200).send(images);
  }
   
  public createImage = async (request: Request, response: Response) => {

console.log("Creating Image");
console.log(request.body);

      const { 
        lastModified,
        lastModifiedDate,
        name,
        size,
        type,
        image_data
    } = request.body;
  
      const image = new Image({ 
        lastModified,
        lastModifiedDate,
        name,
        size,
        type,
        image_data
      });

      const image_data_done = new String(image_data).replace("data:image/jpeg;base64,", "");
      
      const fileContents = Buffer.from(image_data_done, 'base64')
      fs.writeFile("test.jpg", fileContents, (err: any) => {
        if (err) return console.error(err)
        console.log('file saved to ', "test.jpg")
      });
      
      // can we make this asynchronous
      await image.save();
      
      // return response.status(201).send(image)
      return response.status(201).send();
    }
  }
   
  export default ImageController;
  