const Agents = require("../models/agents");
const Clients = require("../models/clients");
const Promotions = require("../models/promotions");
const Services = require("../models/service");
const Notifications = require("../models/notifications");

const FindTable = ({ table }) => {
  if (table.toLowerCase() === "clients") {
    return Clients;
  } else if (table.toLowerCase() === "agents") {
    return Agents;
  } else if (table.toLowerCase() === "promotions") {
    return Promotions;
  } else if (table.toLowerCase() === "services") {
    return Services;
  } else if (table.toLowerCase() === "notifications") {
    return Notifications;
  } else {
    return null;
  }
};

const FilterBodyByTable = ({ req, table }) => {
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
  } else if (table === "notifications") {
    const { title, message, sendto } = req.body;
    return { title, message, sendto };
  } else {
    return null;
  }
};

module.exports = { FindTable, FilterBodyByTable };
