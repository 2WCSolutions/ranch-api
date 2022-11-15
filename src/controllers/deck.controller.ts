4import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { Deck } from '../models/deck.model';

class DeckController implements Controller {
    public path = '/decks';
    public router = Router();
   
    public getAllDecks = async (request: Request, response: Response) => {
      
      // careful careful
      // await deck.deleteMany({});
  
      let decks = await Deck.find()
        .sort({ "deck_name": 1 });
  
      return response.status(200).send(decks);
  }
   
  public createDeck = async (request: Request, response: Response) => {
  
      const { 
        public_id,
        display_name,
        created_date
        } = request.body;
  
      const deck = new Deck({ 
        public_id,
        display_name,
        created_date,
      });
      
      // can we make this asynchronous
      await deck.save();
      
      return response.status(201).send();
    }
  }
   
  export default DeckController;
  