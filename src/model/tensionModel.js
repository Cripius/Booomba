// tensionModel.js

const crypto = require("crypto");
const data = require("../data/tensionData.js");

const tensionModel = {
        obtieneTension() {
        // El orden sys-dia-pul tiene que ser siempre el mismo:
        // Porblema: FHIR no garantiza el orden en un array de components
        const resultado = data.map((d) => {
        const presion_sys = d.component[0].valueQuantity;
        const presion_dia = d.component[1].valueQuantity;
        const presion_pul = d.component[2].valueQuantity;
        return { id: d.id, 
            fecha: d.effectiveDateTime,
            presion_sys: presion_sys,
            presion_dia: presion_dia,
            presion_pul: presion_pul
            };
        });
    return resultado;
    },
    generaIDtension() {
        //genera un id con el formato 202512211200-1
        //para una primera toma que se genera el 2025-12-21 a las 12:00
        const date = new Date();
        // YYYYMMDD
        const fecha = date.getFullYear().toString() 
                    + (date.getMonth() + 1).toString().padStart(2,'0') 
                    + date.getDate().toString().padStart(2,'0');
        //HHMM
        const hora = date.getHours().toString().padStart(2, '0')
                    + date.getMinutes().toString().padStart(2, '0')
                    + date.getSeconds().toString().padStart(2, '0');
        return `T-${fecha}-${hora}`
    },
    altaTension(datos){
    const id = datos.id;
    const nuevaTension = {
        resourceType: "Observation",
        id: id,
        category: [{
            coding: [{system: "http://terminology.hl7.org/CodeSystem/observation-category", code: "vital-signs", display: "Vital Signs"}],
            text: "Vital Signs"
        }],
        code: {
            coding: [{system: "http://loinc.org", code: "85354-9", display: "Blood pressure panel with all children optional"}],
            text: "Blood pressure panel"
        },
        effectiveDateTime: new Date().toISOString(), //para coger la fecha actual
        component: [{
            code: {
                coding: [{system: "http://loinc.org", code: "8480-6", display: "Systolic blood pressure"}]
            },
            valueQuantity: {
                value: datos.sys,
                unit: "mm[Hg]",
                system: "http://unitsofmeasure.org",
                code: "mm[Hg]"            
            },
        referenceRange: [{
            low: {value: 90, unit: "mm[Hg]"
            },
            high: {value: 140, unit: "mm[Hg]"
            },
            type: {
                coding: [{system: "http://terminology.hl7.org/CodeSystem/referencerange-meaning", code: "normal", display: "Normal Range"}]
            }
        }]
    },
    {
        code: {
            coding: [{system: "http://loinc.org", code: "8462-4", display: "Diastolic blood pressure"}]
        },
        valueQuantity: {
            value: datos.dia,
            unit: "mm[Hg]",
            system: "http://unitsofmeasure.org",
            code: "mm[Hg]"            
        },
        referenceRange: [{
            low: {value: 60, unit: "mm[Hg]"
            },
            high: {value: 90, "unit": "mm[Hg]"
            },
            type: {
                coding: [{system: "http://terminology.hl7.org/CodeSystem/referencerange-meaning", code: "normal", display: "Normal Range"}]
            }
        }]
    },
    {
        code: {
            coding: [{system: "http://loinc.org", code: "8867-4", display: "Heart Rate"}]
        },
        valueQuantity: {
            value: datos.pul,
            unit: "mm[Hg]",
            system: "http://unitsofmeasure.org",
            code: "mm[Hg]"            
        },
        referenceRange: [{
            low: {value: 60, unit: "mm[Hg]"
            },
            high: {value: 100, unit: "mm[Hg]"
            },
            type: {
                coding: [{system: "http://terminology.hl7.org/CodeSystem/referencerange-meaning", code: "normal", display: "Normal Value"}]
                }
            }]
        }]
    }
    data.push(nuevaTension);
    console.log(`La tensión de ID: ${id} se ha añadido correctamente.`);
    }
};

module.exports = tensionModel;
