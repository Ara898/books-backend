import express from "express";
import { router } from "./src/books/booksRT.js";
import { cors } from "cors";
const PORT = process.env.PORT ?? 3000; //Lee las variables de entorno
const app = express (); // Nuestra aplicación ejecuta Express
app.use(cors("*"))
app.use(express.json());
app.listen(PORT, err => {  //Esto hace que nuestra aplicación escuche un puerto
    console.log (
        err
            ? `Ocurrió un error: ${err}`
            :  `Servidor corre en http://localhost:${PORT}`
    );
});



//Uso del enrutador
app.use("/books" , router);



//Opciones que le permite realizar el cors al front
//app.options("/books", (req, res) =>{
//    res.header("Access-Control_Allow-Origin", //"http://127.0.0.1:5500");
//    res.header("Access-Control-Allow-Methods", //"GET, POST, PUT, PATCH, DELETE");
//    res.end();
//});