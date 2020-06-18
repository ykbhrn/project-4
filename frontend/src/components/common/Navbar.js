import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getPortfolio } from '../../lib/api'
class Navbar extends React.Component{
  state = { 
    user: [],
    isOpen: false 
  }

  async componentDidMount() {
    try {
      const res = await getPortfolio()
      this.setState( { user: res.data } )
      // if (res.data.user_type === 1) {
      //   this.setState({ user: res.data, isStudent: true })
      // } else if (res.data.user_type === 2) {
      //   this.setState({ user: res.data, isAthlete: true })
      // }
    } catch (err) {
      console.log(err)
    }
  }

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ isOpen: false })
    }
  }
  render() {
    const { isOpen } = this.state
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">

            {isAuthenticated() && 
            <Link to="/" className="navbar-item">
              <span className="logo-navbar">gyminy</span>
            </Link>
            }

            <span onClick={this.handleToggle} className={`navbar-burger ${isOpen ? 'is-active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              {isAuthenticated() && <Link to="/portfolio">
                <img className='navbar-item' src="/images/home.png" />
              </Link>}
              {isAuthenticated() && <Link to="/trainings">
                <img className='navbar-item' src="/images/trainings.png" />
              </Link>}
              {isAuthenticated() && <Link to="/chat">
                <img className='navbar-item' src="/images/chat.png" />
              </Link>}
              {isAuthenticated() && <Link to="/profile">
                <img className='navbar-image navbar-item' src={this.state.user.profile_image} />
              </Link>}
              {!isAuthenticated() && <Link to="/login" className="navbar-item">
              Login
              </Link>}
              {!isAuthenticated() && <Link to="/register" className="navbar-item">
              Register
              </Link>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
export default withRouter(Navbar)