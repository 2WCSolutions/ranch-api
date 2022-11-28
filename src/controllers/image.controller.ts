import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { Image } from '../models/image.model';
import { Buffer } from 'node:buffer';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { Constants } from '../libs/constants';
import { Guid } from 'guid-typescript';

const fs = require('fs');

const blobServiceClient = BlobServiceClient.fromConnectionString(
  "BlobEndpoint=https://ranchstorage.blob.core.windows.net;SharedAccessSignature=sp=racwdl&st=2022-11-25T19:10:10Z&se=2029-11-26T03:10:10Z&spr=https&sv=2021-06-08&sr=c&sig=COvLdIVRfT98kAFeXFl1u4pCk%2B63z6y1EEXpMWb3ajY%3D"
);
const containerClient = blobServiceClient.getContainerClient(
  "media"
);


class ImageController implements Controller {

    public path = Constants.PATH_IMAGES;
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
  
    // build new filename
    let filename = this.buildFilename(name);

    let image = new Image({ 
        lastModified,
        lastModifiedDate,
        name,
        filename,
        size,
        type,
        image_data
      });

      const image_data_done = new String(image_data).replace("data:image/jpeg;base64,", "");

      // set back to image
      image.image_data = "";

      // for testing
      this.saveLocal(image_data_done);

      await this.uploadDocumentToAzure(filename, image_data_done);
      
      await image.save();
      
      return response.status(201).send({
        data: filename
      })
      // return response.status(201).send();
    }

    buildFilename = (name: string) => {      
      const suffix = name.split('.').length > 0 ? name.split('.')[1] : ",jpg";
      return `${Guid.create()}.${suffix}`
    }

    saveLocal = (image_data_done: String) => {

      const fileContents = Buffer.from(image_data_done, 'base64')
      fs.writeFile("test.jpg", fileContents, (err: any) => {
        if (err) return console.error(err)
        console.log('file saved to ', "test.jpg")
      });
    }

    uploadDocumentToAzure = async (filename: string, imageData: String) => {
      
      const accountName = process.env.AZURE_STORAGE_ACCOUNT;
      const sasToken = process.env.AZURE_STORAGE_SASTOKEN;
      if (!accountName) throw Error('Azure Storage accountName not found');
      if (!sasToken) throw Error('Azure Storage accountKey not found');
    
      const containerClient: ContainerClient = blobServiceClient.getContainerClient("media");
  
      const data = Buffer.from(imageData, "base64");
      const blockBlobClient = containerClient.getBlockBlobClient(filename);
      const response = await blockBlobClient.uploadData(data, {
        blobHTTPHeaders: {
          
        },
      });
      if (response._response.status !== 201) {
        throw new Error(
          `Error uploading document ${blockBlobClient.name} to container ${blockBlobClient.containerName}`
        );
      }
      console.log(`Uploaded ${filename}`);
    };
  
    
/*
    download = async () => {

        // connect-with-sas-token.js
        const { BlobServiceClient } = require('@azure/storage-blob');
        const accountName = "ranchstorage";
        const sasToken = "sp=racwdl&st=2022-11-25T19:10:10Z&se=2029-11-26T03:10:10Z&spr=https&sv=2021-06-08&sr=c&sig=COvLdIVRfT98kAFeXFl1u4pCk%2B63z6y1EEXpMWb3ajY%3D";
        if (!accountName) throw Error('Azure Storage accountName not found');
        if (!sasToken) throw Error('Azure Storage accountKey not found');
console.log("test 2");

        const blobServiceUri = `https://${accountName}.blob.core.windows.net`;

console.log("test 3");
console.log(`${blobServiceUri}${sasToken}`);
console.log("test 4");

        const containerName = 'media';
        const blobName = 'Morning.JPG';
      
        const timestamp = Date.now();
        const fileName = `my-new-file-${timestamp}.jpg`;
      
        // create container client
        const containerClient = await blobServiceClient.getContainerClient(containerName);
      
        // create blob client
        const blobClient = await containerClient.getBlockBlobClient(blobName);
      
        // download file
        await blobClient.downloadToFile(fileName);
      
        console.log(`${fileName} downloaded`);
        

    }
*/

  }

  export default ImageController;
  