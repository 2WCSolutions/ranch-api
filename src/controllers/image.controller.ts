import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { Image } from '../models/image.model';
import { Buffer } from 'node:buffer';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

const fs = require('fs');
// const blobServiceClient = BlobServiceClient.fromConnectionString(
//     "YOUR-CONNECTION-STRING"
// );
//   const containerClient = blobServiceClient.getContainerClient(
//     "media"
// );


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

      const containerName = `media`;
      const sasToken = "sp=racwdl&st=2022-11-25T19:10:10Z&se=2029-11-26T03:10:10Z&spr=https&sv=2021-06-08&sr=c&sig=COvLdIVRfT98kAFeXFl1u4pCk%2B63z6y1EEXpMWb3ajY%3D";
      const storageAccountName = "ranchstorage";


//      await uploadFileToBlob(fileContents);
        await this.upload();
      
      // can we make this asynchronous
        await image.save();
      
      // return response.status(201).send(image)
      return response.status(201).send();
    }



    

    upload = async () => {

        // connect-with-sas-token.js
        const { BlobServiceClient } = require('@azure/storage-blob');
console.log("test 1");
        const accountName = "ranchstorage";
        const sasToken = "sp=racwdl&st=2022-11-25T19:10:10Z&se=2029-11-26T03:10:10Z&spr=https&sv=2021-06-08&sr=c&sig=COvLdIVRfT98kAFeXFl1u4pCk%2B63z6y1EEXpMWb3ajY%3D";
        if (!accountName) throw Error('Azure Storage accountName not found');
        if (!sasToken) throw Error('Azure Storage accountKey not found');
console.log("test 2");

        const blobServiceUri = `https://${accountName}.blob.core.windows.net`;

        const blobServiceClient = new BlobServiceClient(
            `${blobServiceUri}${sasToken}`,
            null
        );
console.log("test 3");
console.log(`${blobServiceUri}${sasToken}`);

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

// 
}

//   const uploadDocumentToAzure = async () => {
//     const data = Buffer.from("BASE-64-ENCODED-PDF", "base64");
//     const blockBlobClient = containerClient.getBlockBlobClient("FILENAME-TO-UPLOAD");
//     const response = await blockBlobClient.uploadData(data, {
//       blobHTTPHeaders: {
//         blobContentType: "application/pdf",
//       },
//     });
//     if (response._response.status !== 201) {
//       throw new Error(
//         `Error uploading document ${blockBlobClient.name} to container ${blockBlobClient.containerName}`
//       );
//     }
//   };

//   const uploadFileToBlob = async (file: Blob | null): Promise<string[]> => {
//     if (!file) return [];

//     const containerName = `media`;
//     const sasToken = "sp=racwdl&st=2022-11-25T19:10:10Z&se=2029-11-26T03:10:10Z&spr=https&sv=2021-06-08&sr=c&sig=COvLdIVRfT98kAFeXFl1u4pCk%2B63z6y1EEXpMWb3ajY%3D";
//     const storageAccountName = "ranchstorage";

  
//     // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
//     const blobService = new BlobServiceClient(
//       `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
//     );
  
//     // get Container - full public read access
//     const containerClient: ContainerClient = blobService.getContainerClient(containerName);
//     await containerClient.createIfNotExists({
//       access: 'container',
//     });
  
//     // upload file
//     await createBlobInContainer(containerClient, file);
  
//     // get list of blobs in container
//     return getBlobsInContainer(containerClient);
//   };



//   const createBlobInContainer = async (containerClient: ContainerClient, file: Blob) => {
  
//     // create blobClient for container
//     const blobClient = containerClient.getBlockBlobClient("aaTrestereresaas.jpg");
  
//     // set mimetype as determined from browser with file upload control
//     const options = { blobHTTPHeaders: { blobContentType: file.type } };
  
//     // upload file
//     await blobClient.uploadData(file, options);
//   }
  
//   // return list of blobs in container to display
// const getBlobsInContainer = async (containerClient: ContainerClient) => {
//   const returnedBlobUrls: string[] = [];

//   const containerName = `media`;
//   const sasToken = "sp=racwdl&st=2022-11-25T19:10:10Z&se=2029-11-26T03:10:10Z&spr=https&sv=2021-06-08&sr=c&sig=COvLdIVRfT98kAFeXFl1u4pCk%2B63z6y1EEXpMWb3ajY%3D";
//   const storageAccountName = "ranchstorage";

//   // get list of blobs in container
//   // eslint-disable-next-line
//   for await (const blob of containerClient.listBlobsFlat()) {
//     // if image is public, just construct URL
//     returnedBlobUrls.push(
//       `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
//     );
//   }

//   return returnedBlobUrls;
// } 
  export default ImageController;
  