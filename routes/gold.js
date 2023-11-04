import express from "express";
var router = express.Router();
import mongoose from "mongoose";
import { goldINR} from "../models/goldRateINRSchema.js";
// var {goldINR} = require('../models/goldRateINRSchema');
// var { dataBaseConnection } = require('../database/dbConfig');
import { dataBaseConnection } from "../database/dbConfig.js";
// mongoose.connect(dataBaseConnection);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/ind_rate', async(req,res)=>{
    if(req.body.currency == 'INR'){
        let rateInr = await goldINR.create(req.body);
        res.send('Data added');
    }else{
        res.send('Please provide valid data');
    }
})

router.get('/historical_data', (req, res) => {
    // Replace this with your logic to fetch historical data
    const historicalData = [
      { date: '2023-06-01', amount: 1000 },
      { date: '2023-06-02', amount: 1200 },
      { date: '2023-06-03', amount: 900 },
      { date: '2023-06-04', amount: 1100 },
      { date: '2023-06-05', amount: 1300 },
    ];
  
    res.json(historicalData);
  });

router.get('/ind_gold_rate', async(req,res)=>{
    const  goldRate = await goldINR.findOne({currency: "INR"});
    console.log(goldRate.price);
    res.send({price: goldRate.price});
})

// module.exports = router;
export const goldRouter = router;