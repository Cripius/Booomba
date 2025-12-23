// franjasRouter.js
// Gestor de rutas para /Franjas

const express = require("express");
const router = express.Router();

const controller = require("../controllers/franjasController.js");

// Rutas
router.get("/", controller.muestraListadoFranjas)




module.exports = router;
