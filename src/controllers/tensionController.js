// tensionController.js
// Controladores para las rutas de /Tension

const tensionModel = require("../model/tensionModel.js");

const tensionController = {
    // 
    iniciarToma: (req,res) => {
        const idTension = tensionModel.generaIDtension();
        res.redirect(`/Tension/tomaTension/${idTension}`);
    },
    muestraTomaTension: (req, res) => {
        const idTension = req.params.id;
        res.render('pages/tension/tomaTension.ejs', {id: idTension});
    },
    muestraDataTension: (req, res) => {
        // const datos = tensionModel.obtieneTension;
        const datos = tensionModel.obtieneTension();
        res.render('pages/tension/dataTension.ejs', {datos: datos});
    },
    procesaDatosFormulario: (req, res) => {
        const id = req.params.id;
        //Number() convierte a int, y si viene vacío lo convierte a 0
        const sys1 = Number(req.body.tension_sys_1);
        const dia1 = Number(req.body.tension_dia_1);
        const pul1 = Number(req.body.tension_pul_1);

        const sys2 = Number(req.body.tension_sys_2);
        const dia2 = Number(req.body.tension_dia_2);
        const pul2 = Number(req.body.tension_pul_2);

        const sys3 = Number(req.body.tension_sys_3);
        const dia3 = Number(req.body.tension_dia_3);
        const pul3 = Number(req.body.tension_pul_3);

        let datos = {};
        if(sys3>0){
            datos = {
                id: `${id}-3`,
                sys_1: sys1,
                dia_1: dia1,
                pul_1: pul1,
                sys_2: sys2,
                dia_2: dia2,
                pul_2: pul2,
                sys_3: sys3,
                dia_3: dia3,
                pul_3: pul3,
                sys_media: Math.round((sys1 + sys2 + sys3) / 3), // Math.round quita decimales
                dia_media: Math.round((dia1 + dia2 + dia3) / 3),
                pul_media: Math.round((pul1 + pul2 + pul3) / 3)
            };
        }
        else if (sys2>0){
            datos = {
                id: `${id}-2`,
                sys_1: sys1,
                dia_1: dia1,
                pul_1: pul1,
                sys_2: sys2,
                dia_2: dia2,
                pul_2: pul2,
                sys_media: Math.round((sys1 + sys2) / 2),
                dia_media: Math.round((dia1 + dia2) / 2),
                pul_media: Math.round((pul1 + pul2) / 2)
            };
        }
        else {
            datos = {
                id: `${id}-1`,
                sys_media: sys1,
                dia_media: dia1,
                pul_media: pul1
            };
        }
        // tensionModel.altaTension(datos);
        res.render('pages/tension/validacionTomaTension.ejs', {datos: datos});
        }
    }       
module.exports = tensionController;