// franjasModel.js
// Modelo para la gestión de franjas (slots) en la base de datos

const crypto = require("crypto");
const franjasData = require("../data/franjasData.js");

const franjasModel = {

  obtieneFranjas() {
    const resultado = franjasData.map((franja) => {
      const nuevoStart = this.__precisionHastaMinutos(franja.start);
      const nuevoEnd = this.__precisionHastaMinutos(franja.end);
      return { id: franja.id, inicio: nuevoStart, fin: nuevoEnd };
    });
    return resultado;
  },

  altaDeFranja(datosFranja) {
    const nuevaFranja = {}; //creo un objeto vacío
    // Generacion de un UUID para la nueva especialidad
    const idFranja = crypto.randomUUID();

    nuevaFranja.resourceType = "Slot";
    nuevaFranja.id = idFranja;
    nuevaFranja.schedule = { reference: "Schedule/Schedule001" };
    nuevaFranja.status = "free"; //por defecto
    nuevaFranja.start = this.__agregaZonaHoraria(datosFranja.inicio);
                              // return instante + ":00Z";
    nuevaFranja.end = this.__agregaZonaHoraria(datosFranja.fin);
    console.log(`franjasModel: Nuevo slot ${JSON.stringify(nuevaFranja)}`);
    franjasData.push(nuevaFranja);
    return { exito: true, idCreado: idFranja };
  },
  bajaFranja(id){
    //findIndex te devuelve el índice de una coincidencia
    const index = franjasData.findIndex((f) => f.id == id);
    //OJO: si no encontramos ese index, pone por defecto el valor a -1
    if(index !==-1){ //hemos encontrado coincidencia
      const idFranja = franjasData[index].id;
      //eliminamos el elemento la posición que hemos especificado
      franjasData.splice(index, 1); //posición a eliminar; cuántos a eliminar
      resultado = {exito: true, idEliminado: idFranja};
    }
    else{
      resultado = {exito: false, mensaje: 'No se ha encontrado la franja a eliminar'};
    }
    console.log(`franjasModel: Baja slot ${JSON.stringify(resultado)}`);
    return resultado;
  },

  // Métodos auxiliares
  __precisionHastaMinutos(instante) {
    // Formato de instante (ISO 8691) YYYY:MM:DDTHH:MM:SS.SSSW  (W puede ser Z o +hh:mm o -hh:mm)
    // Reduce el instante hasta los minutos YYYY:MM:DDTHH:MM
    return instante.slice(0, 16);
  },

  __agregaZonaHoraria(instante) {
    // Los valores del tipo instant en FHIR exige la presencia de la zona horaria
    return instante + ":00Z";
  },
};

module.exports = franjasModel;
