import React from 'react'
import { addTraining } from '../../lib/api'
import { Redirect, Link } from 'react-router-dom'
import AddTraining from './AddTraining'

class TrainingsPage extends React.Component {
  state = {
    formData: {
      name: '',
      date: '',
      time: '',
      description: '',
      sports: []
    },
    showRequests: true,
    showAdd: false,
    redirect: false,
    errors: {
      name: '',
      date: '',
      time: '',
      description: '',
      sports: ''
    }
  }

  handleChange = event => {
    console.log('change event: ', event.target.name)
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

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
      const response = await addTraining(this.state.formData)
      if (response.status === 201){
        this.setState({ redirect: true })
      }
      if (response.status === 422) throw new Error()
    } catch (err) {
      console.log('response: ', err.response.data)
      this.handleErrors(err.response.data)
      
    }
  }

  clickShow = (type) => {
    if (type === 'requests'){
      this.setState({ showRequests: true, showAdd: false })
    } else if (type === 'add'){
      this.setState({ showAdd: true, showRequests: false })
    }
  }

  handleErrors = (errors) => {
    let name = ''
    let date = ''
    let time = ''
    let description = ''
    let sports = ''

    if (errors.name){
      name = 'Training Name Is Required'
    }
    if (errors.date){
      date = 'Training Date Is Required'
    }
    if (errors.time) {
      time = 'Training Time Is Required'
    }
    if (errors.description){
      description = 'Describe Your Training Please'
    }
    if (errors.sports) {
      sports = 'Choose Training Categories Please.'
    }
    
    this.setState({ errors: { name, date, time, description, sports } })
  }

  renderRedirect = () => {
    if (this.state.redirect){
      return <Redirect to="/done/training" />
    }
  }

  render() {
    console.log(this.state.formData)
    const { formData, errors } = this.state
    return (
      <>
        <div className="section">
          <section className="section m-scene">
            <div className="profile-choices-container">

              <div className='small-profile-choices'
                onClick={() => {
                  this.clickShow('requests')
                }}
              >
              New training requests
              </div>

              <div className='small-profile-choices'
                onClick={() => {
                  this.clickShow('add')
                }}
              >
              Add new training slots
              </div>              
            </div>
            {this.state.showRequests &&
            <div>
              Requests here
            </div>
            }

            {this.state.showAdd &&
            <AddTraining 
              renderRedirect={this.renderRedirect}
              handleChange={this.handleChange}
              handleSelect={this.handleSelect}
              handleSubmit={this.handleSubmit}
              handleErrors={this.handleErrors}
              name={formData.name}
              date={formData.date}
              time={formData.time}
              description={formData.description}
              sports={formData.sports}
              errorName={errors.name}
              errorDate={errors.date}
              errorTime={errors.time}
              errorDescription={errors.description}
              errorSports={errors.sports}
            />
            }

          </section>
        </div>
      </>
    )
  }

}
export default TrainingsPage