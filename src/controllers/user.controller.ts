import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { User } from '../models/user.model';
import { Guid } from 'guid-typescript';
import { Shop } from '../models/shop.model';
import ShortUniqueId from 'short-unique-id';
 
class UserController implements Controller {

  public path = '/users';
  public router = Router();
 
  public getAllUsers = async (request: Request, response: Response) => {
    
    // careful careful
    // await User.deleteMany({});

    let users = await User.find(
      {
        deleted_date: { $eq: null }
      }
    )
    .populate("shop")
    .populate("deck")
    .populate("truck")
    .populate("wheel")
    .sort(
        { "display_name": 1 }
      );

    return response.status(200).send(users);
}

public getUserByInvitationCode  = async (request: Request, response: Response) => {
    
  let id = request.params.id;

  let user = await User.findOne(
    {
      invitation_code: { $eq: id }
    }
  )
  .populate("shop")
  .populate("deck")
  .populate("truck")
  .populate("wheel");

  return response.status(200).send(user);
};
 
public getUser = async (request: Request, response: Response) => {
  console.log("Get User");
    
  let id = request.params.id;

  let user = await User.findOne(
    {
      public_id: { $eq: id }
    }
  )
  .populate("shop")
  .populate("deck")
  .populate("truck")
  .populate("wheel");

  return  response.status(200).send(user);
}

public deleteUser = async (request: Request, response: Response) => {
  console.log("Delete User");

  let id = request.params.id;

  console.log(id);

  let user = await User.findOne({
    public_id: { $eq: id }
  });

  if (user != null) {

    user.deleted_date = new Date().toUTCString();

    await user.save();

    return response.status(204).send();
  } else {
    return response.status(404).send();
  }

}

public updateUser = async (request: Request, response: Response) => {
  console.log("Update User");
  console.log(request.body);

  let id = request.params.id;
  
  const { 
    display_name,
    description,
    first_name,
    last_name,
    phone,
    email,
    user_image_url,
    shop_id,
    shop_name,
    shop_phone,
    deck_id,
    deck_name,
    trucks_id,
    trucks_name,
    wheels_id,
    wheels_name,
    invitation_sent_date
    } = request.body;
console.log(request.body);
  let user = await User.findOne({
    public_id: { $eq: id }
  });

  if (user != null) {

    // get shop
    let shop = await Shop.findOne({public_id: { $eq: shop_id }});
    user.shop = shop?._id;

    user.display_name = display_name;
    user.description = description;
    user.first_name = first_name;
    user.last_name = last_name;
    user.phone = phone;
    user.email = email;
    user.user_image_url = user_image_url;
    user.shop_id = shop_id;
    user.shop_name = shop_name;
    user.shop_phone = shop_phone;
    user.deck_id = deck_id;
    user.deck_name = deck_name;
    user.trucks_id = trucks_id;
    user.trucks_name = trucks_name;
    user.wheels_id = wheels_id;
    user.wheels_name = wheels_name
    user.invitation_sent_date = invitation_sent_date;

    user.updated_date = new Date().toUTCString();

    try {
      // can we make this asynchronous
      await user.save();
      
      // return response.status(201).send(user)
      return response.status(201).send(user);
    } catch (error: any) {
      return response.status(201).send(error);
    }    
  } else {
    return response.status(404).send();
  }

}

public createUser = async (request: Request, response: Response) => {

  const { 
    user_id, 
    public_id,
    display_name,
    description,
    first_name,
    last_name,
    phone,
    email,
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
      description,
      first_name,
      last_name,
      phone,
      email,
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

    // get shop
    let shop = await Shop.findOne({public_id: { $eq: shop_id }});
    user.shop = shop?._id;

    // set unique invitation code
    user.invitation_code = (new ShortUniqueId({ length: 6, dictionary: 'alpha_upper' }))()

    console.log(request.body);
    try {
      // can we make this asynchronous
      await user.save();
      
      // return response.status(201).send(user)
      return response.status(201).send(user);
    } catch (error: any) {
      return response.status(201).send(error);
    }

  }
}
 
export default UserController;
