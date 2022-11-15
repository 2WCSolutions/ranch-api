import mongoose from 'mongoose';
import { Guid } from 'guid-typescript';

interface DeckModelInterface extends mongoose.Model<DeckDoc> {
    getAll(): DeckDoc[],
}

interface UserDoc extends mongoose.Document {
    public_id: String;
    deck_name: String;
    created_date: String;
}

const deckSchema = new mongoose.Schema({
    deck_name: {
        type: String, 
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

const Deck = mongoose.model<UserDoc, DeckModelInterface>('Deck', deckSchema)
  
export { Deck }
