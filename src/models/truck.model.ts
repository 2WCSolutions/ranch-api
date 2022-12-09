import mongoose from 'mongoose';
import { Guid } from 'guid-typescript';

interface TruckModelInterface extends mongoose.Model<TruckDoc> {
    getAll(): TruckDoc[],
}

interface TruckDoc extends mongoose.Document {
    public_id: String;
    truck_name: String;
    description: String;
    truck_image_url: String;
    created_date: String;
    updated_date: String;
    deleted_date: String;
}

const truckSchema = new mongoose.Schema({
    truck_name: {
        type: String, 
        required: false
    },
    description: {
        type: String, 
        required: true
    },
    truck_image_url: {
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
})

const Truck = mongoose.model<TruckDoc, TruckModelInterface>('Truck', truckSchema)
  
export { Truck }
