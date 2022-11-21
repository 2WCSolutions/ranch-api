import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { Wheel } from '../models/wheel.model';
import { Guid } from 'guid-typescript';

class WheelController implements Controller {
    public path = '/wheels';
    public router = Router();
   
    public getAllWheels = async (request: Request, response: Response) => {
      
      // careful careful
      // await wheel.deleteMany({});
  
      let wheels = await Wheel.find()
        .sort({ "wheel_name": 1 });
  
      return response.status(200).send(wheels);
  }
   
  public createWheel = async (request: Request, response: Response) => {
  
      const { 
        public_id,
        display_name,
        created_date
        } = request.body;
  
      const wheel = new Wheel({ 
        public_id,
        display_name,
        created_date,
      });
      
      // can we make this asynchronous
      await wheel.save();
      
      // return response.status(201).send(wheel)
      return response.status(201).send();
    }
  }
   
  export default WheelController;
  