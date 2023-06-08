const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes"))

router.use("/product", require("./product.routes"));

router.use("/order", require("./order.routes"));


module.exports = router;
