const { Pool } = require('pg')

module.exports = {
    // initialise a connection to postgresql
    connectPostgres: () => {
        let msg = 'Successful'
        try {
            const pool = new Pool({ connectionString: process.env.URI_POSTGRES_REST_API_NODEJS_POSTGRESQL, max: 50 })
            return pool
        } catch (e) {
            msg = 'Unsuccessful'
        } finally {
            console.log(`${msg} connection to database...`)
        }
    },
    // This routine handles any error that is thrown within the node API
    errorHandling: (e, req, res, next) => {
        const { statusCode } = e
        console.log('STATUES CODE: ', statusCode)
        switch (statusCode) {
            case 404:
                res.sendStatus(statusCode)
                break;
            case 500:
                res.sendStatus(statusCode)
                break;
            default:
                console.log('Uknown Error Type: ' , e.name )
                res.sendStatus(400)
                break;
        }
    },
    // routine that checks if a datatype has a value
    hasValue: function (v) {
        // routine that returns most javascript types
        const T = (() => ({
            STRING: '[object String]',
            ARRAY: '[object Array]',
            OBJECT: '[object Object]',
            NUMBER: '[object Number]',
            SET: '[object Set]',
            UNDEFINED: '[object Undefined]',
            NULL: '[object Null]'
        }))()
        const s = Object.prototype.toString

        switch (s.call(v)) {
            case T.STRING:
            case T.ARRAY:
                return v.length > 0 ? true : false
            case T.OBJECT:
                return Object.values(v).length > 0 ? true : false
            case T.NUMBER:
                return Number(v).toString().length > 0 ? true : false
            default:
                return false
        }
    },

    // evaluateErrorObject: e => {
    //     let statusCode = 400;
    //     switch (e.name) {
    //         case 'Error':
    //             statusCode = 404
    //             break;
    //         case 'SyntaxError':
    //             statusCode = 404
    //             break;
    //         case 'ReferenceError':
    //             statusCode = 404
    //             break;
    //         case 'EvalError':
    //             statusCode = 404
    //             break;
    //         case 'TypeError':
    //             statusCode = 404
    //             break;
    //         default:
    //             statusCode = 404;
    //             break;
    //     }

    //     // updates error object
    //     e.statusCode = statusCode
    //     return e

    // }
}