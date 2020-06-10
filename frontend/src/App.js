import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { isAuthenticated } from './lib/auth'


import IndexPortfolio from './components/portfolio/IndexPortfolio'
import SinglePortfolio from './components/portfolio/SinglePortfolio'
import AddPortfolio from './components/portfolio/AddPortfolio'
import AddArticle from './components/portfolio/AddArticle'
import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import MyProfilePage from './components/common/MyProfilePage'
import TrainingsPage from './components/common/TrainingsPage'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import NotFound from './components/common/ErrorPage'
import AddDone from './components/common/AddDone'
import SecureRoute from './components/common/SecureRoute'


const App = () => (
  <BrowserRouter>
    {isAuthenticated() && <Navbar /> }
    <Switch>
      <Route exact path='/' component={Home} />
      <SecureRoute path='/portfolio/:videos/:id' component={SinglePortfolio} />
      <Route path='/portfolio/:id' component={SinglePortfolio} />
      <Route path='/:reload/portfolio' component={IndexPortfolio} />
      <Route path='/portfolio' component={IndexPortfolio} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <SecureRoute path='/profile' component={MyProfilePage} />
      <SecureRoute path='/trainings' component={TrainingsPage} />
      <SecureRoute path='/done/:type' component={AddDone} />
      <SecureRoute path='/add/:portfolio' component={AddPortfolio} />
      <SecureRoute path='/newarticle' component={AddArticle} />
      <Route path="/*" component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App