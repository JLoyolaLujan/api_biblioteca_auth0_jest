// import mongoose
const mongoose = require("mongoose");

// shema 
const LibroSchema = new mongoose.Schema({
    titulo: String,
    autor: String
}, { collection: "libros" });

const Libro = mongoose.model("Libro", LibroSchema);

// we export
module.exports = Libro;