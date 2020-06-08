import React from 'react'
import { addArticles } from '../../lib/api'
import { Redirect, Link } from 'react-router-dom'

class AddArticle extends React.Component {
  state = {
    formData: {
      imageUrl: '',
      text: '',
      title: ''
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
      await addArticles(this.state.formData) 
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


  render() {
    const { formData, error } = this.state
    return (
      <section className="section">
        {this.renderRedirect()}
        <h1 className="title is-2 has-text-centered">Add New Article</h1>

        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column">
              <div className="field">
                <div className="control">
                  <input
                    className={`input ${error ? 'is-danger' : '' }`}
                    placeholder='Article Title'
                    name="title"
                    onChange={this.handleChange}
                    value={formData.title}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className={`input ${error ? 'is-danger' : ''}`}
                    placeholder='Text'
                    name="text"
                    onChange={this.handleChange}
                    value={formData.text}
                  />
                </div>
                {error && <small className="help is-danger">{error}</small>}
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className={`input ${error ? 'is-danger' : ''}`}
                    placeholder='Url for Article Image'
                    name="imageUrl"
                    onChange={this.handleChange}
                    value={formData.imageUrl}
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

export default AddArticle