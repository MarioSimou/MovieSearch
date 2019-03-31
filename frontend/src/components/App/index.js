import React from 'react'
import { BrowserRouter , Switch , Route } from 'react-router-dom'

// components
import Home from '../Home'
import Navbar from '../Navbar'

const App = props => {
    return (
        <div className="app">
            <BrowserRouter>
                    <Navbar/>
                <Switch>
                    <Route exact path="/" component={ Home } />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App