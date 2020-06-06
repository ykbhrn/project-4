import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


// import Home from './components/common/Home'
import IndexPortfolio from './components/portfolio/IndexPortfolio'
import SinglePortfolio from './components/portfolio/SinglePortfolio'
import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import MyProfilePage from './components/common/MyProfilePage'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ErrorPage from './components/common/ErrorPage'


const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/portfolio/:videos/:id' component={SinglePortfolio} />
      <Route path='/portfolio/:id' component={SinglePortfolio} />
      <Route path='/portfolio' component={IndexPortfolio} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path='/profile' component={MyProfilePage} />
      <Route path="/*" component={ErrorPage} />
    </Switch>
  </BrowserRouter>
)

export default App