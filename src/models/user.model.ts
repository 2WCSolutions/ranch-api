import mongoose, { Types } from 'mongoose';
import { Guid } from 'guid-typescript';

interface UserModelInterface extends mongoose.Model<UserDoc> {
    getAll(): UserDoc[],
}
  
interface UserDoc extends mongoose.Document {
    user_id: String,
    public_id: String,
    display_name: String,
    description: String;
    first_name: String,
    last_name: String,
    phone: String,
    email: String,
    user_image_url: String,
    shop_id: String,
    shop_name: String,
    shop_phone: String,
    deck_id: String,
    deck_name: String,
    trucks_id: String,
    trucks_name: String,
    wheels_id: String,
    wheels_name: String,
    invitation_sent_date: Date,
    claimed_date: Date,
    updated_date: String;
    created_date: String,
    deleted_date: String;
    ip_address_nobody_is_anonymous: String,
    shop: Types.ObjectId,
    deck: Types.ObjectId,
    truck: Types.ObjectId,
    wheel: Types.ObjectId
}

const userSchema = new mongoose.Schema({
    user_id: {
        type: String, 
        required: false
    },
    display_name: {
        type: String, 
        required: true
    },
    description: {
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
        required: true
    },
    last_name: {
        type: String, 
        required: true
    },
    phone: {
        type: String, 
        required: false
    },
    email: {
        type: String, 
        required: false
    },
    user_image_url: {
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
    invitation_sent_date: {
        type: Date, 
        required: false
    },
    claimed_date: {
        type: Date, 
        required: false
    },
    created_date: {
        type: String, 
        default: new Date().toUTCString(),
        required: false
    },
    updated_date: {
        type: String, 
        default: new Date().toUTCString(),
        required: false
    },
    deleted_date: {
        type: String, 
        required: false
    },
    ip_address_nobody_is_anonymous: {
        type: String, 
        required: false
    },
    shop: {
        type: Types.ObjectId,
        ref: "Shop"
    },
    deck: {
        type: Types.ObjectId,
        ref: "Deck"
    },
    truck: {
        type: Types.ObjectId,
        ref: "Truck"
    },
    wheel: {
        type: Types.ObjectId,
        ref: "Wheel"
    }
})

const User = mongoose.model<UserDoc, UserModelInterface>('User', userSchema)
  
export { User }
