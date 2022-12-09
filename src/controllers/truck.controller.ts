import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { Truck } from '../models/truck.model';
import { Guid } from 'guid-typescript';

class TruckController implements Controller {
    public path = '/trucks';
    public router = Router();
   
    public getAllTrucks = async (request: Request, response: Response) => {
      console.log("Get All Trucks");
      
      // careful careful
      // await truck.deleteMany({});
  
      let trucks = await Truck.find(
        {
          deleted_date: { $eq: null }
        }
      ).sort(
          { "truck_name": 1 }
        );
  
      return response.status(200).send(trucks);
  }

  public getTruck = async (request: Request, response: Response) => {
    console.log("Get Truck");
      
    let id = request.params.id;

    let trucks = await Truck.findOne(
      {
        public_id: { $eq: id }
      }
    );

    return response.status(200).send(trucks);
}

public updateTruck = async (request: Request, response: Response) => {
    console.log("Update Truck");

    let id = request.params.id;
    
    const { 
      truck_name,
      description,
      truck_image_url,
      created_date
    } = request.body;

    let truck = await Truck.findOne({
      public_id: { $eq: id }
    });

    if (truck != null) {

      truck.truck_name = truck_name;
      truck.description = description;
      truck.truck_image_url = truck_image_url;

      truck.updated_date = new Date().toUTCString();

      await truck.save();

      return response.status(201).send();
    } else {
      return response.status(404).send();
    }

  }

  public deleteTruck = async (request: Request, response: Response) => {
    console.log("Delete Truck");

    let id = request.params.id;

    console.log(id);

    let truck = await Truck.findOne({
      public_id: { $eq: id }
    });

    if (truck != null) {

      truck.deleted_date = new Date().toUTCString();

      await truck.save();

      return response.status(204).send();
    } else {
      return response.status(404).send();
    }

  }

  public createTruck = async (request: Request, response: Response) => {
    
      const { 
        truck_name,
        description,
        truck_image_url,
        created_date
      } = request.body;

 
      let public_id = Guid.create();

      const truck = new Truck({ 
        public_id,
        truck_name,
        description,
        truck_image_url,
        created_date,
      });
      
      // can we make this asynchronous
      await truck.save();
      
      // return response.status(201).send(truck)
      return response.status(201).send();
    }
  }
   
export default TruckController;
