const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {});
});

router.get("/realtime", (req, res) => {
  res.render("realtimeproducts", {});
});

module.exports = router;
