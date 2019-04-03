const { body } =  require('express-validator/check'),
      { hasValue } = require('../util'),
      { compare } = require('bcryptjs')
      
const c = (() => ({
    hasValueCheck : ( v , { req } ) => {
        if( hasValue( v )) return true
        else throw new Error()
    },
    pwdLengthCheck : ( v ) => {
        if(/\w{8,}/.test( v )) return true
        else throw new Error()
    },
    compPwdConfPwd : ( v , { req } ) => {
        const { password, confPassword } = req.body
        if( password === confPassword ) return true
        else throw new Error()
    },
    checkEmailExistence : async e => {
        const { connection } = process
        const { rows } = await connection.query('SELECT * FROM users WHERE email IN($1)' , [ e ])
        if(  rows.length === 0 ) return true
        else throw new Error()
    },
    checkUsernameExistence : async u => {
        const { connection } = process
        const { rows } = await connection.query('SELECT * FROM users WHERE username IN($1)' , [ u ])
        if(  rows.length === 0 ) return true
        else throw new Error()
    },
    validatePasswords : async ( p , { req }) => {
        const { user } = req
        const isSame = await compare( p , user.password )
        if( isSame ) return true
        else throw new Error()
    }
}))()


module.exports = (() => ({
    validateRegistration : [
    body('username')
        .custom( c.hasValueCheck )
        .withMessage('Please fill all the values to proceed.')
        .custom( c.checkUsernameExistence )
        .withMessage('The username/emails has already been registered.'),
    body('email')
        .custom( c.hasValueCheck )
        .withMessage('Please fill all the values to proceed.')
        .isEmail()
        .withMessage('Unrecognized email address.')
        .custom( c.checkEmailExistence )
        .withMessage('The username/emails has already been registered.'),
    body('password')
        .custom( c.hasValueCheck )
        .withMessage('Please fill all the values to proceed.')
        .custom( c.pwdLengthCheck )
        .withMessage('The password should be at least eight characters long')
        .custom( c.compPwdConfPwd )
        .withMessage('Passwords do not match. Please enter the passwords again.')  
        ,
    body('confPassword')
        .custom( c.hasValueCheck )
        .withMessage('Please fill all the values to proceed.')
        .custom( c.pwdLengthCheck )
        .withMessage('The password should be at least eight characters long') 
        .custom( c.compPwdConfPwd )
        .withMessage('Passwords do not match. Please enter the passwords again.')  
    ],
    validateLogin : [
        body('email')
        .custom( c.hasValueCheck )
        .withMessage('Please fill all the values to proceed.')
        .isEmail()
        .withMessage('Unrecognized email address.')
        .custom( async ( e , { req } ) => {
            const { rows } = await process.connection.query('SELECT * FROM users WHERE email IN($1)' , [ e ])
            if( rows.length > 0 ) {
                req.user = rows[0];
                return true
            } else throw new Error()
        } )
        .withMessage('User does not exist.'),
    body('password')
        .custom( c.hasValueCheck )
        .withMessage('Please fill all the values to proceed.')
        .custom( c.pwdLengthCheck )
        .withMessage('The password should be at least eight characters long')
        .custom( c.validatePasswords )
        .withMessage('Invalid password.')
    ]
}))()
