const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "DIR3 Rest API",
      version: "1.0.0",
      description:
        "A REST API to query DIR3 identification codes, as well as other information, of the different Spanish public administrations obtained from publicly available files in the Download Area of ​​the Technology Transfer Center of the Electronic Administration Portal (CTT). The url of the download area is https://administracionelectronica.gob.es/ctt/dir3/descargas",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/",
      },
    },
  },
  apis: ["**/routes/*.{ts,js}", "**/swagger/*.{ts,js}"],
};

export const swaggerSpec = swaggerJsdoc(options);
