import mongoose from 'mongoose';
import { Guid } from 'guid-typescript';

interface TruckModelInterface extends mongoose.Model<TruckDoc> {
    getAll(): TruckDoc[],
}

interface UserDoc extends mongoose.Document {
    public_id: String;
    truck_name: String;
    created_date: String;
}

const truckSchema = new mongoose.Schema({
    truck_name: {
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

const Truck = mongoose.model<UserDoc, TruckModelInterface>('Truck', truckSchema)
  
export { Truck }
