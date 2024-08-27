import mongoose, { Schema } from 'mongoose';


export interface Exchangetype extends mongoose.Document{
    sender:string;
    receiver:string;
    bookrequested: object;
    description?:string;
}


 const ExchangeSchema:Schema<Exchangetype> = new mongoose.Schema({
    sender:{
        type:String,
        required:true,
        trim:true,
    },
    receiver:{
        type:String,
        required:true,
        trim:true,
    },
    bookrequested:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Books'
    },  
    description:{
        type:String,
    }
})


const ExchangeModel = (mongoose.models.Exchange as mongoose.Model<Exchangetype>)
                    || (mongoose.model("Exchange",ExchangeSchema))

export default ExchangeModel;