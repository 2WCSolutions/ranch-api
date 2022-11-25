import mongoose from 'mongoose';
import { Guid } from 'guid-typescript';

interface DeckModelInterface extends mongoose.Model<DeckDoc> {
    getAll(): DeckDoc[],
}

interface DeckDoc extends mongoose.Document {
    public_id: String;
    deck_name: String;
    description: String;
    deck_image_url: String;
    deck_image: {
        size: number,
        name: String
    };
    created_date: String;
}

const deckSchema = new mongoose.Schema({
    deck_name: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    deck_image_url: {
        type: String, 
        required: false
    },
    deck_image: {
        required: false
    },
    public_id: {
        type: String, 
        required: false,
        default: Guid.create()
    },
    created_date: {
        type: String, 
        default: new Date().toUTCString(),
        required: false
    },
})

const Deck = mongoose.model<DeckDoc, DeckModelInterface>('Deck', deckSchema)
  
export { Deck }
