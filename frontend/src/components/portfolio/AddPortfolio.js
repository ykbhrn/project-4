import React from 'react'
import { addImages, addVideos } from '../../lib/api'
import { Redirect, Link } from 'react-router-dom'

class AddPortfolio extends React.Component {
  state = {
    formData: {
      url: '',
      description: ''
    },
    redirect: false,
    error: ''
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData, error: '' })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      if (this.props.match.params.portfolio === 'images') {
        await addImages(this.state.formData) 
      } else if (this.props.match.params.portfolio === 'videos') {
        await addVideos(this.state.formData) 
      }
      this.setState({ redirect: true })    
    } catch (err) {
      this.setState({ error: 'Invalid Credentials' })
    }
  }


  renderRedirect = () => {
    if (this.state.redirect){  
      return <Redirect to="/portfolio" />
    }
  }

  portfolioType = () => {
    let portfolioType
    if (this.props.match.params.portfolio === 'images') {
      return portfolioType = 'Image'
    } else if (this.props.match.params.portfolio === 'videos') {
      return portfolioType = 'Video'
    }
  }

  render() {
    const { formData, error } = this.state
    return (
      <section className="section">
        {this.renderRedirect()}
        <h1 className="title is-2 has-text-centered">Add New {this.portfolioType()}</h1>

        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column">
              <div className="field">
                <div className="control">
                  <input
                    className={`input ${error ? 'is-danger' : '' }`}
                    placeholder={`${this.portfolioType()} Url`}
                    name="url"
                    onChange={this.handleChange}
                    value={formData.url}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    className={`input ${error ? 'is-danger' : ''}`}
                    placeholder={`Describe Your ${this.portfolioType()}`}
                    name="description"
                    onChange={this.handleChange}
                    value={formData.image}
                  />
                </div>
                {error && <small className="help is-danger">{error}</small>}
              </div>

              <div className="field">
                <button type="submit"  className='button is-fullwidth'>Post</button>
              </div>

            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default AddPortfolio
