// bombaModel.js

// const bombaModel = require("../model/bombaModel.js");

const bombaController = {
    muestraBomba: (req, res) => {
        res.render('pages/bomba/bomba.ejs');
    },
    muestraDesactivacion: (req, res) => {
        res.render('pages/bomba/desactivacion.ejs');
    }

    



    }       
module.exports = bombaController;