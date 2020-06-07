import React from 'react'
import { registerUser, loginUser } from '../../lib/api'
import { Redirect, Link } from 'react-router-dom'
import { setToken } from '../../lib/auth'
import SportSelect from '../common/SportSelect'

class Register extends React.Component {
  state = {
    formData: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      sports: [],
      user_type: '1',
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
      sports: '',
      user_type: ''
    }
  }

  handleChange = event => {
    console.log('change evet: ', event.target.name)
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  // const sports = { ...this.state.formData.sports, [event.target.name]: event.target.value }
  // this.state.formData.sports.push( event.target.value )
  // this.setState({ sports })

    handleSelect = event => {
      const sport = this.state.formData.sports.concat(event.target.value)
      const formData = {
        ...this.state.formData, sports: sport 
      }
      this.setState({ formData })
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
    let sports = ''
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
    if (errors.sports) {
      sports = 'Choose your sports'
    }
    if (errors.user_type) {
      userType = 'Choose your sports'
    }

    this.setState({ errors: { username, email, password, password_confirmation: passwordConfirmation, sports, user_type: userType } })
  }

  renderRedirect = () => {
    if (this.state.redirect){
      return <Redirect to="/portfolio" />
    }
  }


  render() {
    const { formData, errors } = this.state
    console.log(this.state.formData.sports)
    return (
      <div className="register-container">
        <section className="register-section">
          {this.renderRedirect()}
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column">
              <div className="has-text-centered title">Sign Up</div>

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

              <div className="register-forms-container field">
                <div className='register-forms'>
                   What sports you are interested in? 
                  <SportSelect
                    handleSelect={this.handleSelect}
                  />
                </div>
                {/* <div className="control">
                  <input
                    className={`input ${errors.sports ? 'is-danger' : ''}`}
                    placeholder="Whats your sports"
                    name="sports"
                    onChange={this.handleChange}
                    value={formData.sports}
                  />
                </div> */}
                {errors.sports && <small className="help is-danger">{errors.sports}</small>}

                <div className='register-forms'>
                  Are you interested to find trainings and advices(student) or offer trainings(athlete)?
                  <div className="control">
                    <label className='radio'>
                      <input type="radio" 
                        name="user_type"
                        value="1"
                        onChange={this.handleChange}
                      ></input>
                      <span className="register-forms-span">Student</span>
                    </label>
                   
                    <label className='radio'>
                      <input type="radio" 
                        name="user_type"
                        value="2"
                        onChange={this.handleChange}
                      ></input>
                      <span className="register-forms-span">Athlete</span>
                    </label>
                    {/* <input
                    className={`input ${errors.user_type ? 'is-danger' : ''}`}
                    placeholder="Are you Athlete or student?"
                    name="user_type"
                    onChange={this.handleChange}
                    value={formData.user_type}
                  /> */}
                    {/* </div> */}
                    {errors.user_type && <small className="help is-danger">{errors.user_type}</small>}
                  </div>
                </div>
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
                <button type="submit"  className={`button is-fullwidth is-dark register-button ${this.state.loading ? 'is-loading' : ''}`}>Register</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default Register
