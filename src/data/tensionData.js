// Datos de huecos disponibles para citas

const resourceType = "Observation";
const fhirPath = "/../../fhir";
const extension = ".fhir.json";

const fs = require("fs");
const path = require("path");
const resourceTypePath = path.join(__dirname, fhirPath, resourceType);

// Array para almacenar los datos de los recursos
const resourceData = [];

try {
  // Lectura de los archivos del directorio de recursos FHIR
    const files = fs.readdirSync(resourceTypePath);

    for (const file of files) {
    // Filtra los recursos según su tipo de recurso y extensión
    if (file.startsWith(resourceType) && file.endsWith(extension)) {
      // Obtiene el recurso
        const resourcePath = path.join(resourceTypePath, file);
        const resource = require(resourcePath);

      // Añade el recurso al array
        resourceData.push(resource);
    }
    }

    console.log(
    `Data: Recurso ${resourceType}: ${resourceData.length} recursos cargados`
    );
} catch (error) {
    console.error("Data: Error al cargar los recursos", error);
}

module.exports = resourceData;
