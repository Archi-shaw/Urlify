const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortid:{
        type:String,
        required:true,
        unique: true,
        index: true,
    },
    redirecturl:{
        type: String,
        required:true,
    },
    viewHistory: [{ 
        timestamp: {type:Number},
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
},
 {timestamp:true }
);

const URL = mongoose.model('URL',urlSchema);
module.exports = URL;


