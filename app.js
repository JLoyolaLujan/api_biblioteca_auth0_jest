/*
get
get by id
post
put 
delete
----- auth implementation -----
get ---> read:libros
get by id ---> read:libros
post ---> write:libros
put ---> write:libros
delete ---> write:libros
*/

const express = require("express"); 
const app = express(); 

// auth
const { auth } = require("express-oauth2-jwt-bearer");
app.use(express.json());

// .env
require("dotenv").config();

// configure auth middleware
/*
const autenticacion = auth({
    audience: "http://localhost:3000/libros",
    issuerBaseURL: "https://dev-7edcxzgeanzx2aax.us.auth0.com/",
    tokenSigningAlg: "RS256"
});
*/
// configure auth middleware
const autenticacion = auth({
    audience: process.env.OAUTH_AUDIENCE,
    issuerBaseURL: process.env.OAUTH_URL,
    tokenSigningAlg: "RS256"
});

// errorHandler middleware
const errorHandler = require("./middleware/errorHandler");

// import mongoose
const connectDB = require("./db/connect");

// import routes
const libros = require("./routes/libros");
app.use("/libros", autenticacion, libros);

// use of error handler
app.use(errorHandler);

// I listen 
const _PORT = process.env.PORT || 3000; 

const start = async () => {
    try {
        await connectDB(); // if the database responds
        // THEN start server
        app.listen(_PORT, () => {
            console.log(`Server listening at http://localhost:${_PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
} 

start();

module.exports = app;

/*
para poder hacer funcionar el programa tuve que generar mis propios
tokens (de nuevo) en auth0.com

tambien tuve que rehacer el programa desde 0 para lograrlo hacer andar como yo deseaba

aquí estan el codigo para importar en postman, y asi conseguir el token

detalles ---> read:libros y write:libros 

curl --request POST \
  --url https://dev-7edcxzgeanzx2aax.us.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"0CVVFecXWklrBngDaRdLLI8Oqsh70efB","client_secret":"FRIs7x6gmYYADygHQ45UxVgTM6jq90Rg-q-zjA-Apu_xiz-WZhmT2woLEV5MXBWK","audience":"http://localhost:3000/libros","grant_type":"client_credentials"}'

dejare activo el link el tiempo necesario, hasta que se califiquen las tareas, o hasta que termine el curso
*/