// Custom Class that extends Error class so the name property to be overridedn
// with the constructor name
class CustomError extends Error {
    constructor( message ){
        super( message )
        this.name = this.constructor.name
    }
}
// HttpError class, which is child of CustomError.
// Such errors have an 404 status code 
class HttpError extends CustomError {
    constructor( message ){
        super( message )
        this.statusCode = 404
    }
}

module.exports =  {
    HttpError
}