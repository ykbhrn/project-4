import React from 'react'
import Register from '../auth/Register'
import Login from '../auth/Login'
import { isAuthenticated } from '../../lib/auth'
import { Redirect } from 'react-router-dom'

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
    <>
      {this.renderRedirect()}
      <div className="columns is-vcentered">
      </div>
      <div className="logo">
          gyminy
        <Login />          
      </div>
    </>
  )
}
}

export default Home