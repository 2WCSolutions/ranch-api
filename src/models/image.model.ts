import mongoose from 'mongoose';

interface ImageModelInterface extends mongoose.Model<ImageDoc> {
}

interface ImageDoc extends mongoose.Document {
    lastModified: Number;
    lastModifiedDate: String,
    name: String;
    size: Number;
    type: String;
    image_data: String;
}

const imageSchema = new mongoose.Schema({
    lastModified: {
        type: Number
    },
    lastModifiedDate: {
        type: String
    },
    name: {
        type: String
    },
    size: {
        type: Number
    },
    type: {
        type: String
    },
    image_data: {
        type: String
    },
})

const Image = mongoose.model<ImageDoc, ImageModelInterface>('Image', imageSchema)
  
export { Image }
