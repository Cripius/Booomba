// indexRouter.js
// Gestor de rutas principal

const express = require("express");
const franjasRouter = require('./franjasRouter');


const router = express.Router();

// Intermediario para gestionar subruta /Franjas
router.use("/Franjas", franjasRouter);

// Ruta raíz /

router.get("/", (req, res) => {
    res.render('pages/index.ejs');
});

// El patrón /*splat representa cualquier ruta 
router.all("/*splat", (req, res) => {
    res.status(404);
    res.render('pages/404.ejs');
});

module.exports = router;
