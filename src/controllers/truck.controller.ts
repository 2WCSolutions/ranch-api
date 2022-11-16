import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { Truck } from '../models/truck.model';

class TruckController implements Controller {
    public path = '/trucks';
    public router = Router();
   
    public getAllTrucks = async (request: Request, response: Response) => {
      
      // careful careful
      // await truck.deleteMany({});
  
      let trucks = await Truck.find()
        .sort({ "truck_name": 1 });
  
      return response.status(200).send(trucks);
  }
   
  public createTruck = async (request: Request, response: Response) => {
  
      const { 
        public_id,
        display_name,
        created_date
        } = request.body;
  
      const truck = new Truck({ 
        public_id,
        display_name,
        created_date,
      });
      
      // can we make this asynchronous
      await truck.save();
      
      // return response.status(201).send(truck)
      return response.status(201).send();
    }
  }
   
  export default TruckController;
  