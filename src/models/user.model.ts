import mongoose from 'mongoose';
import { Guid } from 'guid-typescript';

interface UserModelInterface extends mongoose.Model<UserDoc> {
    getAll(): UserDoc[],
}
  
  interface UserDoc extends mongoose.Document {
    user_id: String,
    public_id: String,
    display_name: String,
    first_name: String,
    last_name: String,
    shop_id: String,
    shop_name: String,
    shop_phone: String,
    deck_id: String,
    deck_name: String,
    trucks_id: String,
    trucks_name: String,
    wheels_id: String,
    wheels_name: String,
    claimed_date: Date,
    created_date: String,
    ip_address_nobody_is_anonymous: String
}

const userSchema = new mongoose.Schema({
    user_id: {
        type: String, 
        required: false
    },
    display_name: {
        type: String, 
        required: false
    },
    public_id: {
        type: String, 
        required: false,
        default: Guid.create()
    },
    first_name: {
        type: String, 
        required: false
    },
    last_name: {
        type: String, 
        required: false
    },
    shop_id: {
        type: String, 
        required: false
    },
    shop_name: {
        type: String, 
        required: false
    },
    shop_phone: {
        type: String, 
        required: false
    },
    deck_id: {
        type: String, 
        required: false
    },
    deck_name: {
        type: String, 
        required: false
    },
    trucks_id: {
        type: String, 
        required: false
    },
    trucks_name: {
        type: String, 
        required: false
    },
    wheels_id: {
        type: String, 
        required: false
    },
    wheels_name: {
        type: String, 
        required: false
    },

    claimed_date: {
        type: Date, 
        default: new Date(),
        required: false
    },
    created_date: {
        type: String, 
        default: new Date().toUTCString(),
        required: false
    },
    ip_address_nobody_is_anonymous: {
        type: String, 
        required: false
    },
})

const User = mongoose.model<UserDoc, UserModelInterface>('User', userSchema)
  
export { User }
