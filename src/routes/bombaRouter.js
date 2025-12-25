// bombaRouter.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/bombaController.js");

// Rutas

router.get("/", controller.muestraBomba);

router.get("/desactivada", controller.muestraDesactivacion);

module.exports = router;
