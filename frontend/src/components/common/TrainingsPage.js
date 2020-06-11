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
      limit: '',
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
    trainingOwnerId: '',
    trainingOwnerUsername: '',
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


  async handleBooking(id, ownerId, ownerUsername ) {
    try {
      const res = await bookTraining(id)
      this.setState({ studentRedirect: true, trainingOwnerId: ownerId, trainingOwnerUsername: ownerUsername })
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
      return <Redirect to={`/done/booking/${this.state.user.id}/${this.state.user.username}`} />
    }
  }

  handleBookingForm = (limit, bookings) => {
    let capacity

    if (bookings === 0) {
      if (limit === 1) {
        return <>
          <div>Capacity Limit: <span className="card-header-title"> Individual Training </span></div>
        </>
      } else if (this.state.isStudent) {
        return <>
          <div>Capacity Limit: <span className="card-header-title">{limit} Students </span></div>
          <div>Booked: <span className="card-header-title">{bookings} Students</span></div>
        </>
      } else {
        return <>
          <div>Capacity Limit: <span className="card-header-title">{limit} Students </span></div>
        </>
      }
    } else if (bookings >= limit) {
      if (limit === 1) {
        return <>
          <div>Capacity Limit: <span className="card-header-title"> Individual Training </span></div>
          <div>
            Training Is Fully Booked
          </div>
        </>
      } else {
        return <>
          <div>Capacity Limit: <span className="card-header-title">{limit} Students </span></div>
          <div>
            Training Is Fully Booked
          </div>
        </>
      }
    } else {
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
              <div className="profile-choices-container index">

                <span onClick={() => {
                  this.clickShow('requests')
                }} className={`small-profile-choices ${this.state.showRequests ? 'selected-menu-choice' : ''}`}>
                  New Training Requests</span>

                <span onClick={() => {
                  this.clickShow('booked')
                }} className={`small-profile-choices ${this.state.showBookedTrainings ? 'selected-menu-choice' : ''}`}>
                  Booked Trainings</span>

                <span onClick={() => {
                  this.clickShow('not')
                }} className={`small-profile-choices ${this.state.showNotBookedTrainings ? 'selected-menu-choice' : ''}`}>
                  Not Booked Yet</span>

                <span onClick={() => {
                  this.clickShow('add')
                }} className={`small-profile-choices ${this.state.showAdd ? 'selected-menu-choice' : ''}`}>
                  Add New Training Slots</span>

              </div>

              {this.state.showRequests &&
                <div className='portfolio-container'>
                  Requests here
                </div>
              }

              {this.state.showBookedTrainings &&
                <div className='portfolio-container'>
                  <h1 className="title is-2 has-text-centered">Your Next Trainings</h1>
                  <hr />
                  <div className="columns is-multiline scene_element scene_element--fadein">

                    {this.state.user.trainings.map(training => (
                      <>
                        <Trainings
                          key={training.id}
                          id={training.id}
                          name={training.name}
                          date={training.date}
                          time={training.time}
                          username={training.owner.username}
                          userId={training.owner.id}
                          sports={training.sports.map(sport => (`${sport.name}  `))}
                          description={training.description}
                          limit={training.limit}
                          bookingForm={this.handleBookingForm}
                          bookings={training.bookings}
                        />
                      </>
                    ))}

                  </div>
                </div>
              }

              {this.state.showNotBookedTrainings &&
                <div className='portfolio-container'>
                  <h1 className="title is-2 has-text-centered">Your Trainings Without Booking</h1>
                  <hr />
                  <div className="columns is-multiline scene_element scene_element--fadein">

                    {this.state.user.trainings.map(training => (
                      <>
                        <Trainings
                          key={training.id}
                          id={training.id}
                          name={training.name}
                          date={training.date}
                          time={training.time}
                          username={training.owner.username}
                          userId={training.owner.id}
                          sports={training.sports.map(sport => (`${sport.name}  `))}
                          description={training.description}
                          limit={training.limit}
                          bookings={training.bookings}
                          bookingForm={this.handleBookingForm}
                        />
                      </>
                    ))}

                  </div>
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
                  limit={formData.limit}
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
              <div className="profile-choices-container index">

                <span onClick={() => {
                  this.clickShow('requests')
                }} className={`small-profile-choices ${this.state.showRequests ? 'selected-menu-choice' : ''}`}>Find New Trainings</span>

                <span onClick={() => {
                  this.clickShow('booked')
                }} className={`small-profile-choices ${this.state.showBookedTrainings ? 'selected-menu-choice' : ''}`}>My Next Trainings</span>

              </div>

              {this.state.showBookedTrainings &&
                <div className='portfolio-container'>
                  <h1 className="title is-2 has-text-centered">My Next Trainings</h1>
                  <hr />
                  <div className="columns is-multiline scene_element scene_element--fadein">

                    {this.state.user.student_trainings.map(training => (
                      <>
                        <div
                          key={training.id}
                          className="column column is-one-third-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile" >
                          <div className="card">
                            {/* < Link to={`/trainings/${training.id}`}> */}
                            <h4 className="card-header-title">{training.name}</h4>
                            <div>Instructor: <Link to={`/profile/${training.owner.id}`}><span className="card-header-title">{training.owner.username}</span></Link></div>
                            <div>Date: <span className="card-header-title">{training.date}</span></div>
                            <div>Time: <span className="card-header-title">{training.time}</span></div>
                            <div>Sport: <span className="card-header-title">{training.sports.map(sport => (`${sport.name}  `))}</span></div>
                            <div>Description: <span className="card-header-title">{training.description}</span></div>
                            {/* </Link > */}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              }

              {this.state.showRequests &&
              <div className='portfolio-container'>
                <h1 className="title is-2 has-text-centered">All Available Trainings</h1>
                <hr />
                <div className="columns is-multiline scene_element scene_element--fadein">

                  {this.state.trainings.map(training => (
                    <>
                      {!training.isFull &&
                        <div
                          key={training.id}
                          className="column column is-one-third-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile" >
                          <div className="card">
                            {/* < Link to={`/trainings/${training.id}`}> */}
                            <h4 className="card-header-title">{training.name}</h4>
                            <div>Instructor: <Link to={`/profile/${training.owner.id}`}><span className="card-header-title">{training.owner.username}</span></Link></div>
                            <div>Date: <span className="card-header-title">{training.date}</span></div>
                            <div>Time: <span className="card-header-title">{training.time}</span></div>
                            <div>Sport: <span className="card-header-title">{training.sports.map(sport => (`${sport.name}  `))}</span></div>
                            <div>Description: <span className="card-header-title">{training.description}</span></div>
                            {this.handleBookingForm(training.limit, training.bookings)}
                            <div className="field">
                              <button
                                onClick={() => {
                                  this.handleBooking(training.id, training.owner.id, training.owner.username)
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