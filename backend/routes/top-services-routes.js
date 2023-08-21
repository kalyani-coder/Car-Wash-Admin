const express = require("express");

const router = express.Router();

let Promotions = [
  {
    Id: 0,
  },
];

router.post("/addPromotion", (req, res) => {
  const {
    title,
    description,
    service,
    offerType,
    fixedAmount,
    percentageAmount,
    couponCode,
  } = req.body;

  const newPromotion = {
    Id: Promotions.length,
    title,
    description,
    service,
    offerType,
    fixedAmount,
    percentageAmount,
    couponCode,
  };

  Promotions.push(newPromotion);

  console.log(Promotions);

  res.status(201).json(Promotions);
});

router.get("/getPromotions", (req, res) => {
  console.log("hit!");
  res.status(200).json(Promotions);
});

router.delete("/deletePromotion/:PromotionId", (req, res) => {
  const { PromotionId } = req.params;
  Promotions = Promotions.filter((promotion) => promotion.Id != PromotionId);
  res.status(200).json(Promotions);
});

module.exports = router;
