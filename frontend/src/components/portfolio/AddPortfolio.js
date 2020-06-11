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
  portfolioName = this.props.match.params.portfolio

  isImage = () => {
    if (this.portfolioName === 'images') {
      return true
    }
    return false
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData, error: '' })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      if (this.portfolioName === 'images') {
        await addImages(this.state.formData)
      } else if (this.portfolioName === 'videos') {
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
    let result
    if (this.portfolioName === 'images') {
      return result = 'Photo'
    } else if (this.portfolioName === 'videos') {
      return result = 'Video'
    }
  }

  setUrl = imgUrl => {
    const formData = { ...this.state.formData, url: imgUrl }
    this.setState({ formData })
  }

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
      <section className="add-form-section">
        {this.renderRedirect()}
        <h1 className="title">Add New {this.portfolioType()}</h1>

        <div className="add-form-container">
          <form onSubmit={this.handleSubmit}>

            <label className="label">Choose Your {this.portfolioType()}</label>
            <div className="upload-portfolio">
              <input
                className={`input ${error.url ? 'is-danger' : ''}`}
                type="file"
                onChange={this.handleUpload}
              />
              {this.isImage() && 
              <>
                {formData.url ? <img src={formData.url} alt="User's Upload" /> : ''}
              </>
              }

              {!this.isImage() && 
              <>
                {formData.url ? <video src={formData.url} alt="User's Upload" controls/> : ''}
              </>
              }
            </div>
            {error.url && <small className="help is-danger">{error.url}</small>}

            <textarea
              className={`textarea ${error ? 'is-danger' : ''}`}
              placeholder={'Few Word To Describe It?'}
              rows="3"
              cols="40"
              name="description"
              onChange={this.handleChange}
              value={formData.description}
            />
            {error && <small className="help is-danger">{error}</small>}

            {this.state.isLoading && <>
              <img src='/images/loading.svg' className='loading-image' />
            </>
            }
            {!this.state.isLoading && 
                  <div type="submit" className='button'> Post It 
                  </div>
            }    
  
          </form>
        </div>
      </section >
    )
  }
}

export default AddPortfolio
