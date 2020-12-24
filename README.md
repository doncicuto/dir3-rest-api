# DIR3-Rest-API

## Versión en español

Este repositorio contiene código [Typescript](https://www.typescriptlang.org/) para disponer de un API que permite consultar la información obtenida de los ficheros JSON generados por el código del repositorio [dir3-to-json](https://github.com/doncicuto/dir3-to-json) y que han sido importados en una base de datos SQL usando el código del repositorio [dir3-to-db](https://github.com/doncicuto/dir3-to-db).

Para desarrollar el API de consulta se ha empleado:

- [Express.js](https://expressjs.com/es/) web application framework para servir las consultas al API.
- [Helmet](https://www.npmjs.com/package/helmet) para mejorar la protección del servidor Express.
- [Dotenv](https://github.com/motdotla/dotenv) para disponer de un fichero de variables de entorno útil para el desarrollo.
- [Prisma](https://www.prisma.io) para trabajar con la base de datos.
- [Swagger-JSDOC](https://github.com/Surnet/swagger-jsdoc) para documentar el API.
- [Lightship](https://github.com/gajus/lightship) para implementar chequeos del servicio (liveness, readiness) para futuros despliegues en K8s.

Una vez clonado el repositorio, ejecute `yarn` o `npm install` para instalar las dependencias.

Antes de poder usarlo debe ejecutar: `yarn build` o `npm run build`.

Para lanzar el servidor del API ejecute `yarn start` o `npm start`. Antes de poder lanzarlo deberá proporcionar la variable DATABASE_URL para indicar en qué base de datos se encuentran los datos DIR3.

Para facilitar el desarrollo, Prisma así como el resto del código cargan sus variables de entorno desde un fichero .env situado en el raíz. El repositorio [https://github.com/motdotla/dotenv](https://github.com/motdotla/dotenv) ofrece información sobre esta opción y por qué dicho fichero no forma parte de este repositorio ni es utilizado en producción. El fichero .env en desarrollo contiene las siguientes variables:

- `DATABASE_URL="postgresql://test:test@localhost:5432/dir3?schema=public"` especifica la variable que permitirá a Prisma conectarse con su base de datos. El proyecto utiliza una base de datos PostgreSQL como ejemplo.
- `EXPRESS_PORT=3000` especifica en qué puerto escuchará el API, por defecto se usará el puerto 3000.
- `MAX_RESULTS_NUMBER=200` si está definida permite especificar el número máximo de resultados que devuelve el API, si no está definida, por defecto se devolverá un máximo de 100 resultadoss.

El siguiente artículo de Nikolas Burk publicado en el [blog de Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-build-a-rest-api-with-prisma-and-postgresql-es) puede resultar de utilidad para entender este repositorio, aunque deberá visitar la página de Prisma para consultar versiones actualizadas del cliente de Prisma.

### API

El API únicamente ofrece endpoints de consulta (GET) para acceder a la información de los distintos tipos de unidad:

- GET /units-age
- GET /units-ccaa
- GET /units-eell
- GET /units-universities
- GET /units/justice
- GET /units-institutions

Para consultar una unidad concreta usando su código DIR3 se disponen de los siguientes endpoints:

- GET /units-age/:dir3
- GET /units-ccaa/:dir3
- GET /units-eell/:dir3
- GET /units-universities/:dir3
- GET /units/justice/:dir3
- GET /units-institutions/:dir3

Se puede obtener más información de cómo usar el API accediendo a la documentación online del API generada con OpenAPI/Swagger. Se puede visitar la documentación visitando el siguiente endpoint:

- GET /api-docs

En dicho endpoint se pueden realizar consultas en vivo sobre la propia interfaz y encontrar ejemplos de uso.

## English version

This repository contains [Typecript](https://www.typescriptlang.org/) code to have an API that allows consulting the information obtained from the JSON files generated by the [dir3-to-json](https://github.com/doncicuto/dir3-to-json) repository code and that have been imported into a SQL database using the code from the [dir3-to-db](https://github.com/doncicuto/dir3-a-db) repository.

To develop the query API we have used:

- [Express.js](https://expressjs.com/es/) web application framework to serve the API queries.
- [Helmet](https://www.npmjs.com/package/helmet) to improve the protection of the Express server.
- [Dotenv](https://github.com/motdotla/dotenv) to have a file of environment variables useful for development.
- [Prisma](https://www.prisma.io) to work with the database.
- [Swagger-JSDOC](https://github.com/Surnet/swagger-jsdoc) to document the API.
- [Lightship](https://github.com/gajus/lightship) to implement service checks (liveness, readiness) for future deployments on K8s.

Once the repository is cloned, run `yarn` or `npm install` to install the dependencies.

Before you can use it you must run: `yarn build` or `npm run build`. Before launching it, you must provide the DATABASE_URL variable to indicate in which database the DIR3 data is located.

To launch the API server run `yarn start` or `npm start`.

To facilitate development, Prisma and the rest of the code load their environment variables from a root .env file. The repository [https://github.com/motdotla/dotenv](https://github.com/motdotla/dotenv) offers information about this option and why this file is not part of this repository nor is it used in production. The .env file under development contains the following variables:

- `DATABASE_URL="postgresql:// test:test@localhost:5432/dir3?Schema=public"` specifies the variable that will allow Prisma to connect to your database. The project uses a PostgreSQL database as an example.
- `EXPRESS_PORT=3000` specifies on which port the API will listen, by default port 3000 will be used.
- `MAX_RESULTS_NUMBER=200` if defined allows specifying the maximum number of results returned by the API, if not defined, by default a maximum of 100 results will be returned.

The following article by Nikolas Burk posted on the [Digital Ocean blog](https://www.digitalocean.com/community/tutorials/how-to-build-a-rest-api-with-prisma-and-postgresql) can be useful to understand this repository, although you should visit the Prisma page to see updated versions of the Prisma client.

### API

The API only offers query endpoints (GETs) to access the information of the different types of units.

- GET /units-age
- GET /units-ccaa
- GET /units-eell
- GET /units-universities
- GET /units/justice
- GET /units-institutions

To consult a specific unit using its DIR3 code, the following endpoints are available:

- GET /units-age/:dir3
- GET /units-ccaa/:dir3
- GET /units-eell/:dir3
- GET /units-universities/:dir3
- GET /units/justice/:dir3
- GET /units-institutions/:dir3

More information on how to use the API can be obtained by accessing the online API documentation generated with OpenAPI / Swagger. You can visit the documentation by visiting the following endpoint:

- GET /api-docs

In this endpoint you can make live queries on the interface itself and find examples of use.
