import React from 'react'
import { registerUser, loginUser } from '../../lib/api'
import { Redirect, Link } from 'react-router-dom'
import { setToken } from '../../lib/auth'


class Register extends React.Component {
  state = {
    formData: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      // sports: [],
      user_type: '',
      bio: '',
      profile_image: ''
    },
    redirect: false,
    loading: false,
    errors: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      // sports: '',
      user_type: ''
    }
  }

  handleChange = event => {
    console.log('change evet: ', event.target.name)
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }



  handleSubmit = async event => {
    event.preventDefault()
    try {
      this.setState({ loading: true })
      const response = await registerUser(this.state.formData)
      
      //If registration goes well, run the login user function with the formdata, then set token and redirect to profile page
      if (response.status === 200){
        const loginResponse = await loginUser(this.state.formData)
        setToken(loginResponse.data.token)
        this.setState({ redirect: true })
      }
      if (response.status === 422) throw new Error()
    } catch (err) {
      console.log('response: ', err.response.data.errors)
      //need to send handleErrors function the errors array from the 422 response as args
      this.handleErrors(err.response.data.errors)
      this.setState({ loading: false })
    }
  }

  handleErrors = (errors) => {
    let username = ''
    let email = ''
    let password = ''
    let passwordConfirmation = ''
    // let sports = ''
    let userType = ''

    if (errors.username){
      username = 'Your Username Is Required'
    }
    if (errors.email && errors.email.kind === 'required'){
      email = 'Your email Is Required'
    }
    if (errors.email && errors.email.kind === 'unique'){
      email = 'You already have an account, go to sign in'
    }
    if (errors.password) {
      password = 'Password is required'
    }
    if (errors.password_confirmation){
      passwordConfirmation = 'Password confirmation does not match'
    }
    // if (errors.sports) {
    //   sports = 'Choose your sports'
    // }
    if (errors.user_type) {
      userType = 'Choose your sports'
    }

    this.setState({ errors: { username, email, password, password_confirmation: passwordConfirmation, user_type: userType } })
  }

  renderRedirect = () => {
    if (this.state.redirect){
      return <Redirect to="/portfolio" />
    }
  }


  render() {
    const { formData, errors } = this.state
    console.log(this.state)
    return (
      <section className="section">
        {this.renderRedirect()}
        <div className="">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column">
              <h1 className="has-text-centered">Sign Up Here</h1><br />

              <div className="field">
                {/* <label className="label">Name</label> */}
                <div className="control">
                  <input
                    className={`input ${errors.username ? 'is-danger' : ''}`}
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                    value={formData.username}
                  />
                </div>
                {errors.username ? <small className="help is-danger">{errors.username}</small> : ''}
              </div>

              <div className="field">
                {/* <label className="label">Email</label> */}
                <div className="control">
                  <input
                    className={`input ${errors.email ? 'is-danger' : ''}`}
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                    value={formData.email}
                  />
                </div>
                {this.state.errors.email ? <small className="help is-danger">{errors.email}</small> : ''}
              </div>

              <div className="field">
                {/* <label className="label">Password</label> */}
                <div className="control">
                  <input
                    className={`input ${errors.password ? 'is-danger' : ''}`}
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={formData.password}
                  />
                </div>
                {errors.password && <small className="help is-danger">{errors.password}</small>}
              </div>

              <div className="field">
                {/* <label className="label">Password Confirmation</label> */}
                <div className="control">
                  <input
                    type="password"
                    className={`input ${errors.password_confirmation ? 'is-danger' : ''}`}
                    placeholder="Password Confirmation"
                    name="password_confirmation"
                    onChange={this.handleChange}
                    value={formData.password_confirmation}
                  />
                </div>
                {errors.password_confirmation && <small className="help is-danger">{errors.password_confirmation}</small>}
              </div>

              {/* <div className="field">
                <div className="control">
                  <input
                    className={`input ${errors.sports ? 'is-danger' : ''}`}
                    placeholder="Whats your sports"
                    name="sports"
                    onChange={this.handleChange}
                    value={formData.sports}
                  />
                </div>
                {errors.sports && <small className="help is-danger">{errors.sports}</small>}
              </div> */}

              <div className="field">
                <div className="control">
                  <input
                    className={`input ${errors.user_type ? 'is-danger' : ''}`}
                    placeholder="Are you Athlete or student?"
                    name="user_type"
                    onChange={this.handleChange}
                    value={formData.user_type}
                  />
                </div>
                {errors.user_type && <small className="help is-danger">{errors.user_type}</small>}
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className='input'
                    placeholder="Your profile image"
                    name="profile_image"
                    onChange={this.handleChange}
                    value={formData.profile_image}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className='input'
                    placeholder="Your Bio"
                    name="bio"
                    onChange={this.handleChange}
                    value={formData.bio}
                  />
                </div>
              </div>

              <div className="field">
                <button type="submit"  className={`button is-fullwidth register-button ${this.state.loading ? 'is-loading' : ''}`}>Register</button>
              </div>
              <Link to='/login'>
                <div className="field">
                  <button type="button" className="button is-fullwidth is-dark is-outlined">Have an account? Sign in Here</button>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Register
