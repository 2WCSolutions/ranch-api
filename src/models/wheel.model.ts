import mongoose, { Types } from 'mongoose';
import { Guid } from 'guid-typescript';

interface WheelModelInterface extends mongoose.Model<WheelDoc> {
    getAll(): WheelDoc[],
}

interface WheelDoc extends mongoose.Document {
    public_id: String;
    wheel_name: String;
    description: String;
    wheel_image_url: String;
    created_date: String;
    updated_date: String;
    deleted_date: String;
    users: Types.ObjectId;
}

const wheelSchema = new mongoose.Schema({
    wheel_name: {
        type: String, 
        required: false
    },
    description: {
        type: String, 
        required: true
    },
    wheel_image_url: {
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
    updated_date: {
        type: String, 
        default: new Date().toUTCString(),
        required: false
    },
    deleted_date: {
        type: String, 
        required: false
    },
    users: {
        type: [Types.ObjectId],
        ref: "users"
    }
})

const Wheel = mongoose.model<WheelDoc, WheelModelInterface>('Wheel', wheelSchema)
  
export { Wheel }
