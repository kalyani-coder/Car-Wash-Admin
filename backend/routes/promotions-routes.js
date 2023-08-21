const express = require("express");
const Promotions = require("../models/promotions");
const router = express.Router();

router.post("/", (req, res) => {
  const {
    title,
    description,
    service,
    offerType,
    fixedAmount,
    percentageAmount,
    couponCode,
  } = req.body;

  const newPromotion = new Promotions({
    title,
    description,
    service,
    offerType,
    fixedAmount,
    percentageAmount,
    couponCode,
    image: "image",
  });

  try {
    newPromotion.save();
  } catch (err) {
    console.log(err);
  }

  res.status(201).json(Promotions);
});

router.get("/", async (req, res) => {
  try {
    const promotions = await Promotions.find().exec();
    res.status(200).json(promotions.map((promotion) => promotion.toObject()));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:promotionId", async (req, res) => {
  const { promotionId } = req.params;
  try {
    await Promotions.findByIdAndDelete(promotionId);
    res.status(200).json({ message: "Promotion deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/:promotionId", async (req, res) => {
  const { promotionId } = req.params;
  const {
    name,
    address,
    orderDetails,
    pincode,
    contactNumber,
    email,
    pickUpAddress,
  } = req.body;

  try {
    await Promotions.findByIdAndUpdate(promotionId, {
      title,
      description,
      service,
      offerType,
      fixedAmount,
      percentageAmount,
      couponCode,
    });
    res.status(200).json({ message: "Promotion updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
