import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { Wheel } from '../models/wheel.model';
import { Guid } from 'guid-typescript';

class WheelController implements Controller {
    public path = '/wheels';
    public router = Router();
   
    public getAllWheels = async (request: Request, response: Response) => {
      console.log("Get All Wheels");
      
      // careful careful
      // await wheel.deleteMany({});
  
      let wheels = await Wheel.find(
        {
          deleted_date: { $eq: null }
        }
      ).sort(
          { "wheel_name": 1 }
        );
  
      return response.status(200).send(wheels);
  }

  public getWheel = async (request: Request, response: Response) => {
    console.log("Get Wheel");
      
    let id = request.params.id;

    let wheels = await Wheel.findOne(
      {
        public_id: { $eq: id }
      }
    );

    return response.status(200).send(wheels);
}

public updateWheel = async (request: Request, response: Response) => {
    console.log("Update Wheel");

    let id = request.params.id;
    
    const { 
      wheel_name,
      description,
      wheel_image_url,
      created_date
    } = request.body;

    let wheel = await Wheel.findOne({
      public_id: { $eq: id }
    });

    if (wheel != null) {

      wheel.wheel_name = wheel_name;
      wheel.description = description;
      wheel.wheel_image_url = wheel_image_url;

      wheel.updated_date = new Date().toUTCString();

      await wheel.save();

      return response.status(201).send();
    } else {
      return response.status(404).send();
    }

  }

  public deleteWheel = async (request: Request, response: Response) => {
    console.log("Delete Wheel");

    let id = request.params.id;

    console.log(id);

    let wheel = await Wheel.findOne({
      public_id: { $eq: id }
    });

    if (wheel != null) {

      wheel.deleted_date = new Date().toUTCString();

      await wheel.save();

      return response.status(204).send();
    } else {
      return response.status(404).send();
    }

  }

  public createWheel = async (request: Request, response: Response) => {
    
      const { 
        wheel_name,
        description,
        wheel_image_url,
        created_date
      } = request.body;

 
      let public_id = Guid.create();

      const wheel = new Wheel({ 
        public_id,
        wheel_name,
        description,
        wheel_image_url,
        created_date,
      });
      
      // can we make this asynchronous
      await wheel.save();
      
      // return response.status(201).send(wheel)
      return response.status(201).send();
    }
  }
   
export default WheelController;
