import mysql from 'mysql2/promise'

//Creamos una constante para la configuración con nuestra DB
const dbConfig ={
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
    port: '3306',
    database: "books",
    }
    
//Se crea la conexión con la DB
//export const connection = await mysql.createConnection(dbConfig);
//connection.connect(err => {
//    err ? console.error(err) : console.log("Connected to database");
//})

export const connection = mysql.createPool(dbConfig);
