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
        <div className="column is-centered">
        </div>
        <div className="column">
          <img src="../images/gym.png" alt="GYMINY"></img>
          <Login />          
        </div>
      </div>
    </>
  )
}
}

export default Home