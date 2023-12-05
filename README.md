# books-backend--Calvo-Florencia--Jara-Araceli
Api libros de "Write to us"

Modo de uso:

1-Clona este repositorio.

2-Dependencias que vas a necesitar:
cors
dotenv
express
multer
mysql2
zod

3-Importar la base de datos:
Asegúrate de tener una base de datos creada en tu servidor MySQL. 
Utiliza el archivo "books.sql" en la raíz del proyecto para los datos iniciales en tu base de datos.


4-Configuración:
En el archivo "db_config.js" reemplazaras los siguientes datos por los valores correspondientes a tu DB:
    host: nombre_de_host_de_tu_bd
    user: nombre_de_tu_bd
    password: process.env.DB_PASS,
    port: puerto_de_tu_bd
    database: "books",
    
Crea un archivo .env en la raíz del proyecto con la siguiente configuración y reemplaza los valores:

DB_PASSWORD=contraseña_de_tu_bd


Asegúrate de proporcionar los valores correctos para cada variable de entorno.

Uso 
npm run dev

Desarrollo: Para la api implementamos tecnologías como NodeJs, base de datos relacionales como MySQL y express.

Participantes:
Calvo, Florencia
Jara, Araceli

Hecho con mucho cariño~ 

