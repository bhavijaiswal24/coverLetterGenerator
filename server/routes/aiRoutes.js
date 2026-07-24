const express = require("express");
const router = express.Router();

const { generateCoverLetter } = require("../controllers/aiController");

router.post("/generate", generateCoverLetter);

module.exports = router;