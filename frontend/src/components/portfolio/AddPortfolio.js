import React from 'react'
import { addImages, addVideos } from '../../lib/api'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

const uploadUrl = 'https://api.cloudinary.com/v1_1/djq7pruxd/upload'
const uploadPreset = 'ins6nrmj'


class AddPortfolio extends React.Component {
  state = {
    formData: {
      url: '',
      description: '',
      isLoading: false
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
      this.props.history.push('/portfolio')

      // this.setState({ redirect: true })
    } catch (err) {
      this.setState({ error: 'Invalid Credentials' })
    }
  }


  renderRedirect = () => {
    if (this.state.redirect) {
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

  setUrl = imgUrl => {
    const formData = { ...this.state.formData, url: imgUrl }
    this.setState({ formData })
  }

  // sendData = () => {
  //   this.setUrl(this.state.url)
  // }

  handleUpload = async event => {
    try {
      this.setState({ isLoading: true })
      const data = new FormData()
      data.append('file', event.target.files[0])
      data.append('upload_preset', uploadPreset)
      const res = await axios.post(uploadUrl, data)
      console.log(res.data)
      this.setState({ isLoading: false })
      this.setUrl(res.data.url)
    } catch (err) {
      console.log('err=', err)
    }
  }

  render() {
    const { formData, error } = this.state
    console.log(formData.url)
    console.log(formData)
    return (
      <section className="section">
        {this.renderRedirect()}
        <h1 className="title is-2 has-text-centered">Add New {this.portfolioType()}</h1>

        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column">

              <div>
                <label className="label">Upload Image</label>
                <input
                  className={`input ${error.url ? 'is-danger' : ''}`}
                  type="file"
                  onChange={this.handleUpload}
                />
                {formData.url ? <video src={formData.url} alt="User's Upload"></video> : ''}
              </div>
              {error.url && <small className="help is-danger">{error.url}</small>}

              <div className="field">
                <div className="control">
                  <input
                    className={`input ${error ? 'is-danger' : ''}`}
                    placeholder={`Describe Your ${this.portfolioType()}`}
                    name="description"
                    onChange={this.handleChange}
                    value={formData.description}
                  />
                </div>
                {error && <small className="help is-danger">{error}</small>}
              </div>

              <div className="field">
                {this.state.isLoading && <>
                  <img src='/images/loading.svg' />
                </>
                }
                {!this.state.isLoading && 
                  <div type="submit" className='button is-fullwidth'> Post
                  </div>
                }    
              </div>
  
            </form>
          </div>
        </div>
      </section >
    )
  }
}

export default AddPortfolio
