// franjasRouter.js
// Gestor de rutas para /Franjas

const express = require("express");
const router = express.Router();

const controller = require("../controllers/franjasController.js");

// Rutas
router.get("/", controller.muestraListadoFranjas)

router.get("/alta", controller.muestraFormularioAltaFranja);
router.post("/alta", controller.procesaFormularioAltaFranja);


module.exports = router;
