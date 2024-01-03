const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; 

    // error response object
    const errorResponse = {
        error: {
            message: err.message || "internal server error", 
            code: err.code || "internal_error"
        }
    }

    res.status(statusCode).json(errorResponse);
}

module.exports = errorHandler;