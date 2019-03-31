import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const Card = function ({ movie }) {
    // parse the genre and returns individual divs
    const parseGenre = (genre, sep) => {
        if (genre) {
            return genre.split(sep).slice(0, 3).map(v => {
                return (
                    <div key={v}>
                        {v.trim()}
                    </div>
                )
            })
        } else {
            return (<div></div>)
        }
    }
    // renders the component
    const { Title, Type, imdbRating, Genre, Released, Poster } = movie

    return (
        <Link to={Title || '/'} className="card-link" >
            <div className="card" >
                <div className="main" style={{ background: `url(${Poster}) center center no-repeat scroll  /cover` }} >
                    <div className="header">
                        {Title}
                    </div>
                    <div className="desc">
                        <div className="meta">
                            <div>
                                <i className="clock icon" ></i>
                                {Released}
                            </div>
                            <div>
                                <i className="film icon"></i>
                                {imdbRating}
                            </div>
                        </div>
                        <div className="type">
                            {Type}
                        </div>
                    </div>
                </div>
                <div className="extra">
                    <div className="genre-wrapper">
                        { parseGenre(Genre, ',')}
                    </div>
                </div>
            </div>
        </Link>
    )
}


export default Card