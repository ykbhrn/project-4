import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


// import Home from './components/common/Home'
import IndexPortfolio from './components/portfolio/IndexPortfolio'
import SinglePortfolio from './components/portfolio/SinglePortfolio'
import Home from './components/common/Home'
import Navbar from './components/common/Navbar'



const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/portfolio/:videos/:id' component={SinglePortfolio} />
      <Route path='/portfolio/:id' component={SinglePortfolio} />
      <Route path='/portfolio' component={IndexPortfolio} />
    </Switch>
  </BrowserRouter>
)

export default App