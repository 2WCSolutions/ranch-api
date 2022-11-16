import mongoose from 'mongoose';
import { Guid } from 'guid-typescript';

interface WheelModelInterface extends mongoose.Model<WheelDoc> {
    getAll(): WheelDoc[],
}

interface UserDoc extends mongoose.Document {
    public_id: String;
    wheel_name: String;
    created_date: String;
}

const wheelSchema = new mongoose.Schema({
    wheel_name: {
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

const Wheel = mongoose.model<UserDoc, WheelModelInterface>('Wheel', wheelSchema)
  
export { Wheel }
