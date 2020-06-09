import React from 'react'
import { addTraining, getPortfolio, getAllTrainings, bookTraining } from '../../lib/api'
import { Redirect, Link } from 'react-router-dom'
import AddTraining from './AddTraining'
import Trainings from '../common/Trainings'
import { getToken } from '../../lib/auth'

class TrainingsPage extends React.Component {
  state = {
    user: [],
    trainings: [],
    formData: {
      name: '',
      date: '',
      time: '',
      description: '',
      sports: []
    },
    showRequests: true,
    showAdd: false,
    showBookedTrainings: false,
    showNotBookedTrainings: false,
    redirect: false,
    studentRedirect: false,
    isStudent: false,
    isAthlete: false,
    isGroupTraining: false,
    errors: {
      name: '',
      date: '',
      time: '',
      description: '',
      sports: ''
    }
  }

  async componentDidMount() {
    try {
      const res = await getPortfolio()
      if (res.data.user_type === 1) {
        const resTwo = await getAllTrainings()
        this.setState({ user: res.data, trainings: resTwo.data, isStudent: true })
      } else if (res.data.user_type === 2) {
        this.setState({ user: res.data, isAthlete: true })
      }

    } catch (err) {
      console.log(err)
    }
  }
  

  async handleBooking(id) {
    try {
      // const withHeaders = () => {
      //   return {
      //     headers: { Authorization: `Bearer ${getToken()}` }
      //   }
      // }
      // console.log(withHeaders().headers)
      const res = await bookTraining(id)
      this.setState({ studentRedirect: true })
      console.log(res.data)
    } catch (err) {
      console.log(err)
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
      if (response.status === 201) {
        this.setState({ redirect: true })
      }
      if (response.status === 422) throw new Error()
    } catch (err) {
      console.log('response: ', err.response.data)
      this.handleErrors(err.response.data)

    }
  }

  clickShow = (type) => {
    if (type === 'requests') {
      this.setState({ showRequests: true, showAdd: false, showBookedTrainings: false, showNotBookedTrainings: false })
    } else if (type === 'add') {
      this.setState({ showAdd: true, showRequests: false, showBookedTrainings: false, showNotBookedTrainings: false })
    } else if (type === 'booked') {
      this.setState({ showBookedTrainings: true, showRequests: false, showAdd: false, showNotBookedTrainings: false })
    } else if (type === 'not') {
      this.setState({ showNotBookedTrainings: true, showRequests: false, showBookedTrainings: false, showAdd: false })
    }
  }

  handleErrors = (errors) => {
    let name = ''
    let date = ''
    let time = ''
    let description = ''
    let sports = ''

    if (errors.name) {
      name = 'Training Name Is Required'
    }
    if (errors.date) {
      date = 'Training Date Is Required'
    }
    if (errors.time) {
      time = 'Training Time Is Required'
    }
    if (errors.description) {
      description = 'Describe Your Training Please'
    }
    if (errors.sports) {
      sports = 'Choose Training Categories Please.'
    }

    this.setState({ errors: { name, date, time, description, sports } })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/done/training" />
    }
    if (this.state.studentRedirect) {
      return <Redirect to="/done/booking" />
    }
  }

  capacityLimit = (limit, bookings) => {
    let capacity
    if (limit === 1) {
      return <>
        <div>Capacity Limit: <span className="card-header-title"> Individual Training </span></div>
      </>
    } else {
      return <>
        <div>Capacity Limit: <span className="card-header-title">{limit} Students </span></div>
        <div>Booked: <span className="card-header-title">{bookings} Students</span></div>
      </>
    }
  }

  handleBookedTraining = (booking) => {
    if (booking > 0) {
      return true
    } else if (booking == 0) {
      return false
    }
  }

  render() {
    console.log(this.state.trainings)
    console.log(this.state.user)
    const { formData, errors } = this.state
    return (
      <>
        {this.renderRedirect()}
        <section className="section m-scene">

          {this.state.isAthlete &&
              <>
                <div className="profile-choices-container">
                  <div className='small-profile-choices'
                    onClick={() => {
                      this.clickShow('requests')
                    }}
                  >
                    <span className={`${this.state.showRequests ? 'selected-menu-choice' : ''}`}>New training requests</span>
                  </div>

                  <div className='small-profile-choices'
                    onClick={() => {
                      this.clickShow('booked')
                    }}
                  >
                    <span className={`${this.state.showBookedTrainings ? 'selected-menu-choice' : ''}`}>Booked Trainings</span>
                  </div>

                  <div className='small-profile-choices'
                    onClick={() => {
                      this.clickShow('not')
                    }}
                  >
                    <span className={`${this.state.showNotBookedTrainings ? 'selected-menu-choice' : ''}`}>Not Booked Yet</span>
                  </div>

                  <div className='small-profile-choices'
                    onClick={() => {
                      this.clickShow('add')
                    }}
                  >
                    <span className={`${this.state.showAdd ? 'selected-menu-choice' : ''}`}>Add new training slots</span>
                  </div>
                </div>

                {this.state.showRequests &&
                  <div>
                    Requests here
                  </div>
                }

                {this.state.showBookedTrainings &&
                  <>
                    <h1 className="title is-2 has-text-centered">Next Trainings</h1>
                    <hr />
                    <div className="columns is-multiline scene_element scene_element--fadein">

                      {this.state.user.trainings.map(training => (
                        <>
                          {this.handleBookedTraining(training.bookings) &&
                            <Trainings
                              key={training.id}
                              id={training.id}
                              name={training.name}
                              date={training.date}
                              time={training.time}
                              sports={training.sports.map(sport => (`${sport.name}  `))}
                              description={training.description}
                              isFull={training.isFull} 
                              bookings={training.bookings}
                              limit={training.limit}
                            />
                          }
                        </>
                      ))}

                    </div>
                  </>
                }

                {this.state.showNotBookedTrainings &&
                  <>
                    <h1 className="title is-2 has-text-centered">Trainings Without Booking</h1>
                    <hr />
                    <div className="columns is-multiline scene_element scene_element--fadein">

                      {this.state.user.trainings.map(training => (
                        <>
                          {!this.handleBookedTraining(training.bookings) &&
                            <Trainings
                              key={training.id}
                              id={training.id}
                              name={training.name}
                              date={training.date}
                              time={training.time}
                              sports={training.sports.map(sport => (`${sport.name}  `))}
                              description={training.description}
                              limit={training.limit}
                            />
                          }
                        </>
                      ))}

                    </div>
                  </>
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
              </>
          }
          {this.state.isStudent &&
              <>            
                <div className="profile-choices-container">

                  <div className='small-profile-choices'
                    onClick={() => {
                      this.clickShow('requests')
                    }}
                  >
                    <span className={`${this.state.showRequests ? 'selected-menu-choice student-choice' : ''}`}>Find New Trainings</span>
                  </div>
                
                  <div className='small-profile-choices'
                    onClick={() => {
                      this.clickShow('booked')
                    }}
                  >
                    <span className={`${this.state.showBookedTrainings ? 'selected-menu-choice student-choice' : ''}`}>My Next Trainings</span>
                  </div>
                </div>

                {this.state.showBookedTrainings &&
                <div className="columns is-multiline scene_element scene_element--fadein">

                  {this.state.user.student_trainings.map(training => (
                    <>
                      <div
                        key={training.id}
                        className="column column is-one-third-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile" >
                        <div className="card">
                            id: {training.id}
                          {/* < Link to={`/trainings/${training.id}`}> */}
                          <h4 className="card-header-title">{training.name}</h4>
                          <div>Instructor: <span className="card-header-title">{training.owner.username}</span></div>
                          <div>Date: <span className="card-header-title">{training.date}</span></div>
                          <div>Time: <span className="card-header-title">{training.time}</span></div>
                          <div>Sport: <span className="card-header-title">{training.sports.map(sport => (`${sport.name}  `))}</span></div>
                          <div>Description: <span className="card-header-title">{training.description}</span></div>
                          {this.capacityLimit(training.limit, training.bookings)}
                          <div className="field">
                            <button
                              onClick={() => {
                                this.handleBooking(training.id)
                              }}
                              className='button is-fullwidth is-dark'>Book Time Slot</button>
                          </div>
                          {/* </Link > */}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                }

                {this.state.showRequests &&
                <div className="columns is-multiline scene_element scene_element--fadein">

                  {this.state.trainings.map(training => (
                    <>
                      {!training.isFull &&
                        <div
                          key={training.id}
                          className="column column is-one-third-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile" >
                          <div className="card">
                            id: {training.id}
                            {/* < Link to={`/trainings/${training.id}`}> */}
                            <h4 className="card-header-title">{training.name}</h4>
                            <div>Instructor: <span className="card-header-title">{training.owner.username}</span></div>
                            <div>Date: <span className="card-header-title">{training.date}</span></div>
                            <div>Time: <span className="card-header-title">{training.time}</span></div>
                            <div>Sport: <span className="card-header-title">{training.sports.map(sport => (`${sport.name}  `))}</span></div>
                            <div>Description: <span className="card-header-title">{training.description}</span></div>
                            {this.capacityLimit(training.limit, training.bookings)}
                            <div className="field">
                              <button
                                onClick={() => {
                                  this.handleBooking(training.id)
                                }}
                                className='button is-fullwidth is-dark'>Book Time Slot</button>
                            </div>
                            {/* </Link > */}
                          </div>
                        </div>
                      }
                    </>
                  ))}
                </div>
                }
              </>
          }
        </section>
      </>

    )
  }

}
export default TrainingsPage