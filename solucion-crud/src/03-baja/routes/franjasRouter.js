// franjasRouter.js
// Gestor de rutas para /Franjas

const express = require("express");
const router = express.Router();
const controller = require("../controllers/franjasController.js");

// Rutas
router.get("/", controller.muestraListadoFranjas)

router.get("/alta", controller.muestraFormularioAltaFranja);
router.post("/alta", controller.procesaFormularioAltaFranja);

router.get("/baja/:id", controller.procesaBajaFranja);
    // los dos puntos solo se ponen aqui
    // luego en franjasListado.ejs NO vamos a poner los dos puntos porque es una dirección
        // <a href="/Franjas/baja/<%= franja.id %>">
        // cuando accedermos a una página en la que especificamos parámetros no ponemos dos puntos, la dirección sería algo así
        // Franjas/baja/id-001 <--NO--> Franjas/baja/:id-001
    //POST o GET? realmente no es ninguno de los dos pero como es una base de datos simulada pues si que nos vale un GET


module.exports = router;
