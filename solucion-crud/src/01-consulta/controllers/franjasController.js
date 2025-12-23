// franjasController.js

// Controladores para las rutas de /Franjas

const franjasModel = require("../model/franjasModel.js");

const franjasController = {

    muestraListadoFranjas: (req, res) => {
        const franjas = franjasModel.obtieneFranjas();
        res.render('pages/franjas/franjasListado.ejs', { franjas });
    }
}

module.exports = franjasController