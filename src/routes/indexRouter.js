// indexRouter.js
// Gestor de rutas principal
const express = require("express");
const router = express.Router();
const bombaRouter = require('./bombaRouter');

//Intermediario para usar 
router.use("/Bomba", bombaRouter);

// Ruta raíz /
router.get("/", (req, res) => {
    res.render('pages/inicio.ejs');
});

// El patrón /*splat representa cualquier ruta 
router.all("/*splat", (req, res) => {
    res.status(404);
    res.render('pages/404.ejs');
});

module.exports = router;
