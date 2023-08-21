const express = require("express");
const router = express.Router();
const connection = require("../database");

const determineReq = (req, table) => {
  if (table === "clients") {
    const {
      name,
      address,
      orderDetails,
      pincode,
      contactNumber,
      email,
      pickUpAddress,
    } = req.body;
    return {
      name,
      address,
      orderDetails,
      pincode,
      contactNumber,
      email,
      pickUpAddress,
    };
  } else if (table === "services") {
    const {
      serviceName,
      serviceCategory,
      servicePrice,
      serviceDescription,
      serviceOffer,
      serviceImage,
    } = req.body;
    return {
      serviceName,
      serviceCategory,
      servicePrice,
      serviceDescription,
      serviceOffer,
      serviceImage,
    };
  } else if (table === "promotions") {
    const {
      title,
      description,
      service,
      offerType,
      fixedAmount,
      percentageAmount,
      couponCode,
    } = req.body;
    return {
      title,
      description,
      service,
      offerType,
      fixedAmount,
      percentageAmount,
      couponCode,
    };
  } else if (table === "agents") {
    const { name, contactNumber, email, dob, profilepic } = req.body;
    return { name, contactNumber, email, dob, profilepic };
  } else {
    return null;
  }

  // switch (table) {
  //   case "clients":
  //     const {
  //       name,
  //       address,
  //       orderDetails,
  //       pincode,
  //       contactNumber,
  //       email,
  //       pickUpAddress,
  //     } = req.body;
  //     return {
  //       name,
  //       address,
  //       orderDetails,
  //       pincode,
  //       contactNumber,
  //       email,
  //       pickUpAddress,
  //     };
  //   case "services":
  //     const {
  //       serviceName,
  //       serviceCategory,
  //       servicePrice,
  //       serviceDescription,
  //       serviceOffer,
  //       serviceImage,
  //     } = req.body;
  //     return {
  //       serviceName,
  //       serviceCategory,
  //       servicePrice,
  //       serviceDescription,
  //       serviceOffer,
  //       serviceImage,
  //     };
  //   case "promotions":
  //     const {
  //       title,
  //       description,
  //       service,
  //       offerType,
  //       fixedAmount,
  //       percentageAmount,
  //       couponCode,
  //     } = req.body;
  //     return {
  //       title,
  //       description,
  //       service,
  //       offerType,
  //       fixedAmount,
  //       percentageAmount,
  //       couponCode,
  //     };
  //   case "agents":
  //     const { name, contactNumber, email, dob, profilepic } = req.body;
  //     return { name, contactNumber, email, dob, profilepic };
  //   default:
  //     return null;
  // }
};

router.post("/:table", (req, res) => {
  const { table } = req.params;
  const body = determineReq(req, table);
  if (body) {
    connection.query(
      `INSERT INTO ?? SET ?`,
      [table, body],
      (error, results) => {
        if (error) {
          res
            .status(401)
            .json({ message: "Unable to insert", body: body, error: error });
          return;
        }
        res.json(results);
      }
    );
  } else {
    res.status(401).json({ message: "Bad request..." });
  }
});

router.post("/:table/:id", (req, res) => {
  const { table, id } = req.params;
  const body = determineReq(req, table);
  if (body) {
    connection.query(
      `UPDATE ?? SET ? WHERE id = ?`,
      [table, body, id],
      (error, results) => {
        if (error) {
          res
            .status(401)
            .json({ message: "Unable to update", body: body, error: error });
          return;
        }
        res.json(results);
      }
    );
  } else {
    res.status(401).json({ message: "Bad request..." });
  }
});

module.exports = router;
