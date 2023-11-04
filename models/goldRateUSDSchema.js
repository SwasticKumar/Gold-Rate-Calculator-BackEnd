import mongoose from "mongoose";

const goldRateUSDSchema = new mongoose.Schema({
    currency:{
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    }
})

const goldUSD = mongoose.model("goldrate_usa",goldRateUSDSchema);
export {goldUSD};