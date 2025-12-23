// index.js

const express = require("express");
const PORT = 3000;

const path = require("path");
const PUBLIC_PATH = path.join(__dirname, "public");
const VIEWS_PATH = path.join(__dirname, "views");
const ROUTES_PATH = path.join(__dirname, "routes");

const indexRouter = require(ROUTES_PATH + "/indexRouter.js");

const app = express();

// Vistas
app.set("views", VIEWS_PATH);
app.set("view engine", "ejs");

// Intermediarios
app.use(express.static(PUBLIC_PATH));
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);

app.listen(PORT, () => {
    console.log(`Servidor atendiendo al puerto ${PORT}`);
});

