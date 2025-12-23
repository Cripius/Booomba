// tensionRouter.js
// Gestor para rutas relacionadas con la toma de tensión
const express = require("express");
const router = express.Router();
const controller = require("../controllers/tensionController.js");

// Rutas


router.get("/iniciarToma", controller.iniciarToma);

router.get("/tomaTension/:id", controller.muestraTomaTension);

router.post("/tomaTension/:id", controller.procesaDatosFormulario);

// router.get("/tomaTension/validacion/:id", controller.muestraValidacionTomaTension);

router.get("/datos", controller.muestraDataTension);




module.exports = router;
