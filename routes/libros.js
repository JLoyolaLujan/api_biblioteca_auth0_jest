// import
const express = require("express");
const router = express.Router();
const {getAll, postItem, getById, editItem, deleteItem} = require("../controllers/libros"); 
const { requiredScopes } = require("express-oauth2-jwt-bearer");

router.get("/", requiredScopes("read:libros"), getAll);
router.get("/:id", requiredScopes("read:libros"), getById); 
router.post("/", requiredScopes("write:libros"), postItem); 
router.put("/:id", requiredScopes("write:libros"), editItem); 
router.delete("/:id", requiredScopes("write:libros"), deleteItem); 

module.exports = router; 