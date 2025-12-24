// bombaRouter.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/bombaController.js");

// Rutas

router.get("/", controller.muestraBomba);

module.exports = router;
