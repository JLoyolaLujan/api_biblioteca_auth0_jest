// PRUEBAS UNITARIAS

// importo controles
const {
    getAll,
    getById,
    postItem,
    editItem,
    deleteItem
} = require("../../controllers/libros");

// importo modelo de libros
const libroModel = require("../../models/Libro");

jest.mock("../../models/Libro.js");

describe("Libro Controller", () => {
    let mockRes; 

    beforeEach(() => {
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    });

    test("getAll debería obtener todos los libros", async () => {
        const mockLibros = [
            { id: 1, title: "Libro 1" },
            { id: 2, title: "Libro 2" }
        ]; 

        libroModel.find.mockResolvedValue(mockLibros);

        const mockReq = {}; 

        await getAll(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200); 
        expect(mockRes.json).toHaveBeenCalledWith(mockLibros);
    });

    test("getById debería obtener un libro", async () => {
        const mockLibro = {
            id: 1, 
            titulo: "Libro encontrado",
            autor: "Juan Perez"
        } 

        libroModel.findById.mockResolvedValue(mockLibro);

        const mockReq = { params: { id: "1" } }; 

        await getById(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200); 
        expect(mockRes.json).toHaveBeenCalledWith(mockLibro);
    });

    test("postItem debería crear un nuevo libro", async () => {
        const mockLibro = {
            id: 1, 
            titulo: "Nuevo encontrado",
            autor: "Juan Perez"
        };
        mockLibro.save = () => {}; // para guardar

        libroModel.create.mockResolvedValue(mockLibro);

        const mockReq = { body: mockLibro }; 

        await postItem(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201); 
        expect(mockRes.json).toHaveBeenCalledWith(mockLibro);
    });

    test("editItem debería actualizar un libro", async () => {
        const id = "1"; 
        const libroEdit = {
            titulo: "Libro Actualizado", 
            autor: "Autor Actualizado"
        }; 
        const libroEditMock = {_id: id, ...libroEdit}; 

        libroModel.findByIdAndUpdate.mockResolvedValue(libroEditMock); 

        const mockReq = {
            params: { id: "1" },
            body: libroEdit
        }; 

        await editItem(mockReq, mockRes); 

        expect(libroModel.findByIdAndUpdate).toHaveBeenCalledWith(id, libroEdit, { new:true });
        expect(mockRes.status).toHaveBeenCalledWith(200); 
        expect(mockRes.json).toHaveBeenCalledWith(libroEditMock);
    });

    test("editItem debería devolver un error si el libro no existe", async () => {
        libroModel.findByIdAndUpdate.mockResolvedValue(null); 

        const mockReq = {
            params: { id: "99" },
            body: { titulo: "Libro Actualizado" }
        }; 

        await editItem(mockReq, mockRes); 

        expect(mockRes.status).toHaveBeenCalledWith(404); 
        expect(mockRes.json).toHaveBeenCalledWith({ error: "libro no encontrado" });
    });

    test("deleteItem debería eliminar un libro existente", async () => {
        const mockLibroEliminado = {
            titulo: "Libro Eliminado", 
            autor: "Autor Eliminado"
        }

        libroModel.findByIdAndDelete.mockResolvedValue(mockLibroEliminado); 

        const mockReq = {
            params: { id: "1" }
        };

        await deleteItem(mockReq, mockRes);

        expect(libroModel.findByIdAndDelete).toHaveBeenCalledWith(mockReq.params.id);
        expect(mockRes.status).toHaveBeenCalledWith(200); 
        expect(mockRes.json).toHaveBeenCalledWith({ message: "libro eliminado exitosamente" });
    })
});