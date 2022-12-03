import e, { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { Deck } from '../models/deck.model';
import { Guid } from 'guid-typescript';

class DeckController implements Controller {
    public path = '/decks';
    public router = Router();
    
    public getAllDecks = async (request: Request, response: Response) => {
      console.log("Get All Decks");
      
      // careful careful
      // await Deck.deleteMany({});
  
      let decks = await Deck.find(
        {
          deleted_date: { $eq: null }
        }
      )
        .sort(
          { "deck_name": 1 }
        );
  
      return response.status(200).send(decks);
  }

  public getDeck = async (request: Request, response: Response) => {
    console.log("Get Deck");
      
    let id = request.params.id;

    let decks = await Deck.findOne(
      {
        public_id: { $eq: id }
      }
    );

    return response.status(200).send(decks);
}

public updateDeck = async (request: Request, response: Response) => {
    console.log("Update Deck");

    let id = request.params.id;
    
    const { 
      deck_name,
      description,
      deck_image_url,
      created_date
    } = request.body;

    let deck = await Deck.findOne({
      public_id: { $eq: id }
    });

    if (deck != null) {

      deck.deck_name = deck_name;
      deck.description = description;
      deck.deck_image_url = deck_image_url;

      deck.updated_date = new Date().toUTCString();

      await deck.save();

      return response.status(201).send();
    } else {
      return response.status(404).send();
    }

  }

  public deleteDeck = async (request: Request, response: Response) => {
    console.log("Delete Deck");

    let id = request.params.id;

    console.log(id);

    let deck = await Deck.findOne({
      public_id: { $eq: id }
    });

    if (deck != null) {

      deck.deleted_date = new Date().toUTCString();

      await deck.save();

      return response.status(204).send();
    } else {
      return response.status(404).send();
    }

  }

  public createDeck = async (request: Request, response: Response) => {
    
      const { 
        deck_name,
        description,
        deck_image_url,
        created_date
      } = request.body;

 
      let public_id = Guid.create();

      const deck = new Deck({ 
        public_id,
        deck_name,
        description,
        deck_image_url,
        created_date,
      });
      
      // can we make this asynchronous
      await deck.save();
      
      // return response.status(201).send(deck)
      return response.status(201).send();
    }
  }
   
export default DeckController;
