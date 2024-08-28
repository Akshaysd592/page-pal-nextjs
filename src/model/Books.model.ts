import mongoose, { Schema }  from "mongoose";

export interface Booktype extends mongoose.Document{
      title:string;
      author:string;
      genre:String;
      bookfile:string;
}

const BookSchema: Schema<Booktype> = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    author:{
        type:String,
        required:true,
        trim:true,
    },
    genre:{
        type: String,
        enum:["Comics","Motivational","Geography","Autobiography","Science and Technology","History"]
    },
    bookfile:{
        type: String,
        required:[true,"file is required"]
    }
})


const BookModel = (mongoose.models.Books as mongoose.Model<Booktype>)
                || mongoose.model<Booktype>("Books",BookSchema);

export default BookModel;