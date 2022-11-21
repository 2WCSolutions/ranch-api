import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { User } from '../models/user.model';
import { Guid } from 'guid-typescript';
 
class UserController implements Controller {

  public path = '/users';
  public router = Router();
 
  public getAllUsers = async (request: Request, response: Response) => {
    
    // careful careful
    // await User.deleteMany({});

    let users = await User.find()
      .sort({ "message": -1 });

    console.log(" 000000000000000000000000000000000000000000000000");
    console.log(request.connection.remoteAddress);
    return response.status(200).send(users);
     // res.header 'Access-Control-Allow-Origin', '*'
}
 
public createUser = async (request: Request, response: Response) => {

    const { 
      user_id, 
      public_id,
      display_name,
      first_name,
      last_name,
      shop_id,
      shop_name,
      shop_phone,
      deck_id,
      deck_name,
      trucks_id,
      trucks_name,
      wheels_id,
      wheels_name,
      created_date,
      ip_address_nobody_is_anonymous
      } = request.body;

    const user = new User({ 
      user_id,
      public_id,
      display_name,
      first_name,
      last_name,
      shop_id,
      shop_name,
      shop_phone,
      deck_id,
      deck_name,
      trucks_id,
      trucks_name,
      wheels_id,
      wheels_name,
      created_date,
      ip_address_nobody_is_anonymous
    });
    
    // can we make this asynchronous
    await user.save();
    
    // return response.status(201).send(user)
    return response.status(201).send();
  }
}
 
export default UserController;
