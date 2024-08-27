import mongoose, { Schema }  from "mongoose";

export interface Booktype extends mongoose.Document{
      title:string;
      author:string;
      genre:String;
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

    }
})


const BookModel = (mongoose.models.Book as mongoose.Model<Booktype>)
                || mongoose.model("Book",BookSchema);

export default BookModel;