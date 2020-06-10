import React from 'react'
import Login from '../auth/Login'
import { isAuthenticated } from '../../lib/auth'
import { Redirect, Link } from 'react-router-dom'

class Home extends React.Component {
state = {
  authenticated: false
}

componentDidMount = async () => {
  if (await isAuthenticated()){
    console.log('authenticated')
    this.setState({ authenticated: true })
  }
}

renderRedirect = () => {
  if (this.state.authenticated){
    console.log('redirecting')
    return <Redirect to="/portfolio" />
  }
}

render() {
  return (
    <div className='home-container'>
      {this.renderRedirect()}
      <div className='logo-navbar-container'>
        <div className="logo-container">
          <div className="logo">
          gymIny
          </div>
          <div className="slogan">
        VIRTUAL GYM, REAL RESULTS
          </div>   
        </div>
        <div className='home-navbar'>
          <Link to="/register"><span className="home-navbar-item">Join GYMINY</span></Link>
          <Link to="/about"><span className="home-navbar-item">About Us</span></Link>
        </div>
      </div>
      <Login />          
    </div>
  )
}
}

export default Home