import multer from "multer";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Definimos el almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const pathStorage = `${__dirname}/../../public`;
        cb(null, pathStorage);
    },
//Decide donde se guarda y cómo
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        const infix = randomUUID();
        const posterName = `poster_${infix}.${ext}`;
        cb(null, posterName);
    },
});

export const uploadFile = multer({ storage });