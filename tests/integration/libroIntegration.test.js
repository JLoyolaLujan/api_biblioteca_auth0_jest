const request = require("supertest"); 
const app = require("../../app");
const libroModel = require("../../models/Libro");

// mockup de autenticación 
jest.mock("express-oauth2-jwt-bearer", () => {
    return {
        auth: jest.fn().mockImplementation(() => (req, res, next) => next()),
        requiredScopes: jest.fn().mockImplementation(() => (req, res, next) => next())
    };
});

// mockup de mongoose 
jest.mock("../../models/Libro.js");

describe("Libro API", () => {
    test("GET /libros debería obtener todos los libros", async () => {
        const mockLibros = [
            { id: "1", title: "Libro 1" },
            { id: "2", title: "Libro 2" }
        ]; 

        libroModel.find.mockResolvedValue(mockLibros);

        const response = await request(app).get("/libros");

        expect(response.status).toBe(200); 
        expect(response.body).toEqual(mockLibros);
        expect(libroModel.find).toHaveBeenCalledTimes(1);
    }); 

    test("POST /libros debería crear un libro nuevo", async () => {
        const libroCreado = {
            id: "1",
            titulo: "Libro Nuevo",
            autor: "Juan Perez"
        }; 

        const libroMock = {
            ...libroCreado,
            save: () => {}
        }; 

        libroModel.create.mockResolvedValue(libroMock);

        const response = await request(app).post("/libros").send(libroMock);

        expect(response.status).toBe(201); 
        expect(response.body).toEqual(libroCreado); 
        expect(libroModel.create).toHaveBeenCalledTimes(1); 
        expect(libroModel.create).toHaveBeenCalledWith(libroCreado);
    });
});