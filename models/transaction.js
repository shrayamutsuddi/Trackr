const mongoose = require("mongoose");
const { timeStamp } = require("node:console");
const transactionSchema = new mongoose.Schema({
    transactionType:{
        type: String,
        enum: ["income" , "expense"],
        required: true
    },
    amount:{
        type: Number,
        required: true,
        min: 0
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Transaction", transactionSchema);