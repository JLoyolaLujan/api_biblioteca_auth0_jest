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

// import model
const Libro = require("../models/Libro");

// get all
const getAll = async (req, res) => {
    try {
        const libros = await Libro.find(); 
        if (!libros) {
            return res.status(404).json({ error: "no hay libros aquí" });
        }
        res.status(200).json(libros);
    } catch (error) {
        res.status(500).send({ error: "Algo salió mal, perdon!" });
    }
}

const getById = async (req, res) => {
    try {
        // id
        const id = req.params.id;
        const libro = await Libro.findById(id);

        if (!libro) {
            return res.status(404).json({ error: "libro no encontrado!" });
        }
        res.status(200).json(libro);
    } catch (error) {
        res.status(500).send({ error: "Algo salió mal, perdon!" });
    }
}

// post
const postItem = async (req, res) => {
    try {
        const nuevoLibro = await Libro.create(req.body); 
        res.status(201).json(nuevoLibro);
    } catch (error) {
        res.status(500).send({ error: "Algo salió mal, perdon!" });
    }
}

// put 
const editItem = async (req, res) => {
    try {
        const id = req.params.id; 
        const libro = await Libro.findByIdAndUpdate(id, req.body, {
            new:true
        });
        if(!libro) {
            return res.status(404).json({ error: "libro no encontrado" });
        }
        res.status(200).json(libro);
    } catch (error) {
        res.status(500).send({ error: "Algo salió mal, perdon!" });
    }
}

// delete
const deleteItem = async (req, res) => {
    try {
        const id = req.params.id; 
        const libro = await Libro.findByIdAndDelete(id); 

        if (!libro) {
            return res.status(404).json({ error: "libro no encontrado" });
        }

        res.status(200).json({ message: "libro eliminado exitosamente" });
    } catch (error) {
        res.status(500).send({ error: "Algo salió mal, perdon!" });
    }
}

module.exports = {
    getAll,
    postItem,
    getById,
    editItem,
    deleteItem
}