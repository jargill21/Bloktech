const express = require("express");
const app = express();
const router = express.Router();

router.get("/profile", (req, res) => {
    res.render('profile')});

module.exports = router;