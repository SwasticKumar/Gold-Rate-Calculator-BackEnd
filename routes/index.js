import express from "express";
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Use me to calculate gold price');
});

// module.exports = router;
export const indexRouter = router;