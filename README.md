# DIR3-Rest-API

Este repositorio contiene código [Typescript](https://www.typescriptlang.org/) para disponer de un API que permite consultar la información obtenida de los ficheros JSON generados por el código del repositorio [dir3-to-json](https://github.com/doncicuto/dir3-to-json) y que han sido importados en una base de datos SQL usando el código del repositorio [dir3-to-db](https://github.com/doncicuto/dir3-to-db).

Para desarrollar el API de consulta se ha empleado:

- [Express.js](https://expressjs.com/es/) para servir las consultas al API.
- [Helmet](https://www.npmjs.com/package/helmet) para mejorar la protección del servidor Express.
- [Dotenv](https://github.com/motdotla/dotenv) para disponer de un fichero de variables de entorno útil para el desarrollo.
- [Prisma](https://www.prisma.io) para trabajar con la base de datos.

Una vez clonado el repositorio, ejecute `yarn` o `npm install` para instalar las dependencias.

Para lanzar el servidor del API ejecute `yarn start` o `npm start`.

Para facilitar el desarrollo, Prisma así como el resto del código cargan sus variables de entorno desde un fichero .env situado en el raíz. El repositorio [https://github.com/motdotla/dotenv](https://github.com/motdotla/dotenv) ofrece información sobre esta opción y por qué dicho fichero no forma parte de este repositorio ni es utilizado en producción. El fichero .env en desarrollo contiene las siguientes variables:

- `DATABASE_URL="postgresql://test:test@localhost:5432/dir3?schema=public"` especifica la variable que permitirá a Prisma conectarse con su base de datos.
- `EXPRESS_PORT=3100` especifica en qué puerto escuchará el API.
- `MAX_RESULTS_NUMBER=200` si está definida permite especificar el número máximo de resultados que devuelve el API, si no está definida, por defecto se devolverá un máximo de 100 resultadoss.

El siguiente artículo de Nikolas Burk publicado en el [blog de Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-build-a-rest-api-with-prisma-and-postgresql-es) puede resultar de utilidad para entender este repositorio, aunque deberá visitar la página de Prisma para consultar versiones actualizadas del cliente de Prisma.

## API

El API únicamente ofrece endpoints de consulta (GET) para acceder a la información de los distintos ficheros:

- GET /units-age
- GET /units-ccaa
- GET /units-eell
- GET /units-universities
- GET /units/justice
- GET /units-institutions

Para consultar una unidad concreta usando su código DIR3 se disponen de los siguientes endpoints

- GET /units-age/:dir3
- GET /units-ccaa/:dir3
- GET /units-eell/:dir3
- GET /units-universities/:dir3
- GET /units/justice/:dir3
- GET /units-institutions/:dir3
