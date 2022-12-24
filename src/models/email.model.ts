import mongoose, { Types } from 'mongoose';
import { Guid } from 'guid-typescript';

interface EmailModelInterface extends mongoose.Model<EmailDoc> {
    getAll(): EmailDoc[],
}

interface EmailDoc extends mongoose.Document {
    from: String;
    to: String;
    display_name: String,
    first_name: String,
    last_name: String,
    body: String;
    user_id: String;
    api_response: String;
    public_id: String;
    created_date: String;
    updated_date: String
    deleted_date: String,
}

const emailSchema = new mongoose.Schema({
    from: {
        type: String, 
        required: false
    },
    to: {
        type: String, 
        required: false
    },
    display_name: {
        type: String, 
        required: true
    },
    first_name: {
        type: String, 
        required: true
    },
    last_name: {
        type: String, 
        required: true
    },
    user_id: {
        type: String, 
        required: false,
        default: Guid.create()
    },
    body: {
        type: String, 
        required: false
    },
    api_response: {
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

});

const Email = mongoose.model<EmailDoc, EmailModelInterface>('Email', emailSchema)
  
export { Email }
