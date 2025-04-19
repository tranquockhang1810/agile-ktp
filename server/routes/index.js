const express = require("express");
const router = express.Router();

router.use("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

module.exports = router;
