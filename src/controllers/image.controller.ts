import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { Image } from '../models/image.model';
import { Buffer } from 'node:buffer';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { Constants } from '../libs/constants';

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

      const containerName = `media`;
      const sasToken = "sp=racwdl&st=2022-11-25T19:10:10Z&se=2029-11-26T03:10:10Z&spr=https&sv=2021-06-08&sr=c&sig=COvLdIVRfT98kAFeXFl1u4pCk%2B63z6y1EEXpMWb3ajY%3D";
      const storageAccountName = "ranchstorage";


//      await uploadFileToBlob(fileContents);
        await this.uploadDocumentToAzure(image_data_done);
      
      // can we make this asynchronous
        await image.save();
      
      // return response.status(201).send(image)
      return response.status(201).send();
    }

    uploadDocumentToAzure = async (imageData: String) => {
      console.log("test 1");
  
      console.log("test 1");
              const accountName = process.env.AZURE_STORAGE_ACCOUNT;
              const sasToken = process.env.AZURE_STORAGE_SASTOKEN;
              if (!accountName) throw Error('Azure Storage accountName not found');
              if (!sasToken) throw Error('Azure Storage accountKey not found');
      console.log("test 2");
      
              const blobServiceUri = process.env.AZURE_STORAGE_BLOB_URL;
      
      
     const containerClient: ContainerClient = blobServiceClient.getContainerClient("media");
     console.log("test 3");
  
      const data = Buffer.from(imageData, "base64");
      const blockBlobClient = containerClient.getBlockBlobClient("test4.jpg");
      const response = await blockBlobClient.uploadData(data, {
        blobHTTPHeaders: {
          
        },
      });
      if (response._response.status !== 201) {
        throw new Error(
          `Error uploading document ${blockBlobClient.name} to container ${blockBlobClient.containerName}`
        );
      }
      console.log("test 4");
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
  