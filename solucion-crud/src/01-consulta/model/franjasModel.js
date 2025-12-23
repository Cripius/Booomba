// franjasModel.js
// Modelo para la gestión de franjas (slots) en la base de datos

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
