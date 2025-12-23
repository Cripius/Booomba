// franjasController.js

// Controladores para las rutas de /Franjas

const franjasModel = require("../model/franjasModel.js");

const franjasController = {

    muestraListadoFranjas: (req, res) => {
        const franjas = franjasModel.obtieneFranjas();
        res.render('pages/franjas/franjasListado.ejs', { franjas });
    }

    ,muestraFormularioAltaFranja: (req, res) => {
        res.render('pages/franjas/franjasAlta.ejs');
    },

    procesaFormularioAltaFranja: (req, res) => {
        const inicio = req.body.inicio; //name="inicio" en franjasAlta.ejs
        const fin = req.body.fin;  //name="fin" en franjasAlta.ejs
        const datosFranja= {inicio, fin}; //creo un objeto 
        const resultado=franjasModel.altaDeFranja(datosFranja);
        res.redirect("/Franjas");
    },
}

module.exports = franjasController