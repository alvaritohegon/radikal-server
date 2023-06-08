const router = require("express").Router();

const Order = require("../models/Order.model");


router.post("/", async (req, res) => {

    try {
        
        //Order.create

    } catch (error) {
      res.status(400).json({ errorMessage: "Error al crear la orden" });
    }
  });

module.exports = router;
