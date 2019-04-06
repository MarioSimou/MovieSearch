
export default (() => ({
    /*
        Method that returns the relative path of a given url  
    */
    getPathname : url => {
        return url.replace(/(http|https):\/\/.*?(?=\/)/, '')
    },
    /*
      Method that checks if a given value has actually a value
     */
    hasValue : function( v ) {
         /*
        Method that returns existing data types in JS
        */
        const JS_TYPES = (() => ({
        String: '[object String]',
        Array: '[object Array]',
        Object: '[object Object]',
        Set: '[object Set]',
        Number: '[object Number]',
        Undefined: '[object Unfefined]',
        Null: '[object Null]'
        }))();
        const type = Object.prototype.toString.call(v)
    
        switch (type) {
            case JS_TYPES.String:
            case JS_TYPES.Array:
                return v.length > 0 ? true : false
            case JS_TYPES.Object:
                return Object.values(v).length > 0 ? true : false
            case JS_TYPES.Number:
                return Number(v).toString().length > 0 ? true : false
            default:
                return null
        }
    },
    createErrorMessage : ( header , content ) => {
        return { show : true , header , content , type : 'error' }
    },
    whichHasErrors : ( e , v ) => {
        return e.reduce( ( a , s ) => ({ ...a , [s.param]: { ...v[s.param] , hasError : true } } ),{})       
    }
    ,
    /*
        Front-end validation functionality 
    */
    isValid : function ( { username , email , password , confPassword } ) {
        const hasUsername = username ? true : false,
              hasEmail = email ? true : false,
              hasPassword = password ? true : false,
              hasConfPassword = confPassword ? true : false,
              errorMessages = [] ;
              
        switch( hasUsername && hasEmail && hasPassword && hasConfPassword){
            // register
            case true:
                if( [ username , email, password , confPassword ].filter( v => this.hasValue( v.value ) ).length !== 4  )
                    errorMessages.push( this.createErrorMessage('Unsuccessful registration.' , 'Fill all the values to continue.'))
                if( password.value !== confPassword.value ) 
                    errorMessages.push( this.createErrorMessage('Unsuccessful registration.' ,  'Passwords do not match. Please enter the passwords again.' ) )
                break;
            // login
            default:
                if( [ email, password ].filter( v => this.hasValue( v.value ) ).length !== 2  )
                    errorMessages.push( this.createErrorMessage('Unsuccessful registration.' , 'Fill all the values to continue.'))
                break;
        }
        // always executed
        if( !/\w{8,}/.test( password.value ))
            // errorMessages.push( this.createErrorMessage( 'Unsuccessful registration.', 'Password length should be higher more than eight characters.') )


        return errorMessages;
    },
    extractTagValues : function( ...args ){
        const { hasValue } = this // extract the hasValue utitity
        return args.map( v => {
            switch( v.tagName.toLowerCase()){
                case 'input':
                case 'textarea':
                    if( hasValue( v.value ) ) return v.value 
                    else return null
                case 'select':
                    const value = Array.from( v.querySelectorAll('option:checked') ).map( v => v.value ).toString()
                    if ( hasValue( value ) ) return value
                    else return null
                case 'radio':
                case 'checkbox':
                    if( hasValue( v.value ) )return v.value
                    else return null
                default:
                    return null
            }
        })
    }
}))()

