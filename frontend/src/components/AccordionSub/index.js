import React from 'react'

const AccordionSub = ({ content , header , isActive }) => {
    // if an content is an array, it generates a list of it
    const generateArrayList = ( ratings ) => {
        if(!ratings) return (<div></div>)

        return ratings.map( ( v , i ) => {
            const { Value , Source } = v
            return (
                <div className="item" key={ i } >
                    <div className="content">
                    <div className="header">{ Source } </div>
                    { Value }
                    </div>
                </div>
            )
        })
    }
    // conditional rendering of sub accordion
    switch( content instanceof Array ){
        case true:
            return (
                <div>
                    <div className={ `title ${ isActive ? 'active' : '' }` }>
                        <i className="dropdown icon"></i>
                        { header }
                    </div>
                    <div className={ `content ${ isActive ? 'active' : '' }` }>
                        <div className="transition visible">
                        <div className="ui middle aligned divided list">
                            { generateArrayList( content ) }
                        </div>
                        </div>
                    </div>
                </div>
                
            )
        default:
            return (
                <div>
                    <div className={ `title ${ isActive ? 'active' : '' }` }>
                        <i className="dropdown icon"></i>
                        { header }
                    </div>
                    <div className={ `content ${ isActive ? 'active' : '' }` }>
                        <p className="transition visible">
                            {content}
                        </p>
                    </div>
                </div>
            )
    }
    
}

export default AccordionSub