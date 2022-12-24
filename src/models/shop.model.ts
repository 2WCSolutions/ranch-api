import mongoose, { Types } from 'mongoose';
import { Guid } from 'guid-typescript';

interface ShopModelInterface extends mongoose.Model<ShopDoc> {
    getAll(): ShopDoc[],
}

interface ShopDoc extends mongoose.Document {
    public_id: String,
    shop_name: String,
    description: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
    fax: String,
    shop_image_url: String,
    created_date: String,
    updated_date: String,
    deleted_date: String,
    users: Types.ObjectId
}

const shopSchema = new mongoose.Schema({
    shop_name: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    address1: {
        type: String, 
        required: false
    },
    address2: {
        type: String, 
        required: false
    },
    city: {
        type: String, 
        required: false
    },
    state: {
        type: String, 
        required: false
    },
    zip: {
        type: String, 
        required: false
    },
    phone: {
        type: String, 
        required: false
    },
    fax: {
        type: String, 
        required: false
    },
    shop_image_url: {
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

const Shop = mongoose.model<ShopDoc, ShopModelInterface>('Shop', shopSchema)
  
export { Shop }
