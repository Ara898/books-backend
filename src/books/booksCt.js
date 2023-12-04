import { BooksModel } from "./bookMd.js";
import { isValidUUID } from "../utils/isValidUUID.js";
import { validateBook, validateId} from "./booksVa.js";
import { deleteImage } from "../utils/dtImagen.js";
import path from "node:path";
//Recibe las consultas del modelo, y se maneja las respuestas obtenidas
export class BookCt {

//Trae todos o por autor
    static async getAll(req, res){
        const { author } = req.query;
        const books = await BooksModel.getAll
        (author);
        books 
            ? res.status(200).json(books)
            : res.status(404).json({ message: "Book Not Found"});
    }

//Trae por autor
static async getByQuery(req, res) {
    if (!req.query.author)
        return res
        .status(400)
        .json({ message: "must be similar to ?author=name_autor" });
}


//Trae por ID
    static async getById(req, res) {
        const {id} = req.params;
        const isValidID = validateId(id);
        if (!isValidID) return res.status(400).json({ message: "Not valid ID"});

        if (!isValidID.success)
            return res.status(422).json({
        message})

        const book = await BooksModel.getById(id);
        if (!book.length) 
            return req.status(404).json({message: "Book Not Found"});
        return res.status(200).json(book);
    }


//Borra uno
    static async deleteOne(req, res) {
        const { id } = req.params;
        const isValidID = isValidUUID(id);
        if (!isValidID) return res.status(422).json    ({ message: "Not valid ID" });
        const [row] = await BooksModel.getById(id);
        const fileName = row.poster.split("http://localhost:3000/").pop();
        const result = await BooksModel.deleteOne(id);
        if (!result) return res.status(404).json({ message: "Book Not Found" });
        await deleteImage(path.resolve(`./public/${fileName}`));
        res.sendStatus(204);
}

//Añade uno
    static async addOne(req, res) {
        const { title, year, author, genre, price, page } = req.body;
        //sanitisedGenre nos asegura que cuando se cree un genero el mismo sea un array
        let sanitisedGenre = [];
        if (typeof genre == "string") {
            sanitisedGenre.push(genre);
        } else {
            sanitisedGenre = genre;
        }
        const poster = `${URL}/${req.file.filename}`;
        const validationResult = validateBook({
            title,
            year: Number(year),
            author,
            genre: sanitisedGenre,
            price: Number(price),
            page: Number(page),
            poster,
        });
        if (!validationResult.success) {
            return res.status(422).json(validationResult.error);
        }
    
        try {
            await BooksModel.addOne({
            ...validationResult.data,
            poster,
        });
            res.status(201).json({ message: "Book created" });
        } catch (error) {
            error.message.startsWith("Incorrect")
            ? res.status(400).json({ message: error.message })
            : res.status(500).json({ message: "Internal Server Error" });
        }
    }
    

//Update
    static async updateOne(req, res) {
        const { id } = req.params;
        const isValidID = isValidUUID(id);
        if (!isValidID) return res.status(422).json({ message: "Not valid ID" });
        const [isBook, _info] = await BooksModel.getById(id);
    
        if (!isBook) return res.status(404).json({ message: "Book Not Found" });
        const updatedBook = await BooksModel.updateOne(id, req.body);
        updatedBook
            ? res.status(200).json({ message: "Book updated" })
            : res.status(500).json({ message: "Internal Server Error" });
    }
}






//Metodo de consulta a un json
//import data from "../data/data.json" //assert {type : "json"};
//export const getAll = (req, res) => {
//    const { author, genre } = req.query;
//    if (!author) return res.status(200).//json({ info:data});
//    const filterByAuthor = data.filter(
//        b =>
//            b.author.toLocaleLowerCase().//includes(director.//toLocaleLowerCase()) &
//            b.genre.some(g => g.//toLocaleLowerCase() === genre.//toLocaleLowerCase())
//    );
//
//          filterByAuthor.length
//         res.status(404).json({message: //"No hay coincidencias"})
//        : res.status(200).json({info: //result });
