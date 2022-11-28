import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { Deck } from '../models/deck.model';
import { Guid } from 'guid-typescript';

class DeckController implements Controller {
    public path = '/decks';
    public router = Router();
   
    public getAllDecks = async (request: Request, response: Response) => {
      
      // careful careful
      // await Deck.deleteMany({});
  
      let decks = await Deck.find()
        .sort({ "deck_name": 1 });
  
      return response.status(200).send(decks);
  }
   
  public createDeck = async (request: Request, response: Response) => {
console.log("Create Deck....");
console.log(request.body);
      const { 
        deck_name,
        description,
        deck_image,
        created_date
      } = request.body;

      console.log("Body");
      console.log(request.body);
      
  
      let public_id = Guid.create();

      const deck = new Deck({ 
        public_id,
        deck_name,
        description,
        deck_image,
        created_date,
      });
      
      // can we make this asynchronous
      await deck.save();
      
      // return response.status(201).send(deck)
      return response.status(201).send();
    }
  }
   
  export default DeckController;
  