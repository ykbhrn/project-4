import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Navbar extends React.Component{
  state = { isOpen: false }

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }
 
  render() {
    const { isOpen } = this.state
    return (
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <span onClick={this.handleToggle} className={`navbar-burger ${isOpen ? 'is-active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              <Link to="/portfolio" className="navbar-item">
              Portfolio
              </Link>
              {/* <Link to="/plants/new" className="navbar-item">
              Add your plant
              </Link>
              <Link to="/profile" className="navbar-item">
              My Profile
              </Link>
              <Link to="/chat" className="navbar-item">
              Chat
              </Link> */}
         
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
export default withRouter(Navbar)