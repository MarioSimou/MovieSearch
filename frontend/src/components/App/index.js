import React from 'react'
import { BrowserRouter , Switch , Route } from 'react-router-dom'

// components
import Home from '../Home'
import Navbar from '../Navbar'
import MovieDetails from '../MovieDetails'
import Login from '../Login'
import Register from '../Register'
import AddMovie from '../AddMovie'

const App = props => {
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route exact path="/login" component={ Login } />
                    <Route exact path="/register" component={ Register } />
                    <Route exact path="/:title" component={ MovieDetails } />
                    <Route exact path="/movies/add" component={ AddMovie } />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App