import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { Shop } from '../models/shop.model';
import { Guid } from 'guid-typescript';

class ShopController implements Controller {
    public path = '/shops';
    public router = Router();
   
    public getAllShops = async (request: Request, response: Response) => {
      console.log("Get All Shops");
      
      // careful careful
      // await shop.deleteMany({});
  
      let shops = await Shop.find(
        {
          deleted_date: { $eq: null }
        }
      ).sort(
          { "shop_name": 1 }
        );
  
      return response.status(200).send(shops);
  }

  public getShop = async (request: Request, response: Response) => {
    console.log("Get Shop");
      
    let id = request.params.id;

    let shops = await Shop.findOne(
      {
        public_id: { $eq: id }
      }
    );

    return response.status(200).send(shops);
  }

  public updateShop = async (request: Request, response: Response) => {
    console.log("Update Shop");
    console.log(request.body);

    let id = request.params.id;
    
    const { 
        shop_name,
        description,
        address1,
        address2,
        city,
        state,
        zip,
        phone,
        fax,
        shop_image_url
    } = request.body;

    let shop = await Shop.findOne({
      public_id: { $eq: id }
    });

    if (shop != null) {

        shop.shop_name = shop_name;
        shop.description = description;

        shop.address1 = address1;
        shop.address2 = address2;
        shop.city = city;
        shop.state = state;
        shop.zip = zip;
        shop.phone = phone;
        shop.fax = fax;

        shop.shop_image_url = shop_image_url;
        shop.updated_date = new Date().toUTCString();

      await shop.save();

      return response.status(201).send();
    } else {
      return response.status(404).send();
    }

  }

  public deleteShop = async (request: Request, response: Response) => {
    console.log("Delete Shop");

    let id = request.params.id;

    console.log(id);

    let shop = await Shop.findOne({
      public_id: { $eq: id }
    });

    if (shop != null) {

        shop.deleted_date = new Date().toUTCString();

      await shop.save();

      return response.status(204).send();
    } else {
      return response.status(404).send();
    }

  }

  public createShop = async (request: Request, response: Response) => {
    
      const { 
        shop_name,
        description,
        address1,
        address2,
        city,
        state,
        zip,
        phone,
        fax,
        shop_image_url
      } = request.body;

 
      let public_id = Guid.create();

      const shop = new Shop({ 
        public_id,
        shop_name,
        description,
        address1,
        address2,
        city,
        state,
        zip,
        phone,
        fax,
        shop_image_url
      });
      
      // can we make this asynchronous
      await shop.save();
      
      // return response.status(201).send(shop)
      return response.status(201).send();
    }
  }
   
export default ShopController;
