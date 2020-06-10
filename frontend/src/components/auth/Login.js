import React from 'react'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'
import { Redirect, Link } from 'react-router-dom'

class Login extends React.Component {
  state = {
    formData: {
      email: '',
      password: ''
    },
    redirect: false,
    loading: false,
    error: ''
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData, error: '' })
  }

  handleSubmit = async event => {
    console.log('new version')
    
    event.preventDefault()

    try {
      this.setState({ loading: true })
      const res = await loginUser(this.state.formData)
      setToken(res.data.token)
      // toast(res.data.message)
      
      this.setState({ redirect: true })
      
    } catch (err) {
      this.setState({ error: 'Invalid Credentials', loading: false })
    }
  }


  renderRedirect = () => {
    if (this.state.redirect){  
      return  window.location.assign('/portfolio')
    }
  }

  render() {
    const { formData, error, loading } = this.state
    return (
      <div className="sign-container">
        <div className="sign-card">
          {this.renderRedirect()}
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              {/* <label className="label">Email</label> */}
              <div className="control">
                <input
                  className={`input ${error ? 'is-danger' : '' }`}
                  placeholder="Email"
                  name="email"
                  onChange={this.handleChange}
                  value={formData.email}
                />
              </div>
            </div>
            <div className="field">
              {/* <label className="label">Password</label> */}
              <div className="control">
                <input
                  type="password"
                  className={`input ${error ? 'is-danger' : ''}`}
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                  value={formData.password}
                />
              </div>
              {error && <small className="help is-danger">{error}</small>}
            </div>
            <div className="field">
              <button type="submit"  className={`button is-fullwidth login-button ${loading ? 'is-loading' : ''}`}>Login</button>
            </div>
            <Link to='/register'>
              <div className="field">
                <button type="button"  className="button is-fullwidth is-light is-outlined">No Account? Sign Up Here</button>
              </div>
            </Link>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
