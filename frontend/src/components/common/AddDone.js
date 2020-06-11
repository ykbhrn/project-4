import React from 'react'
import { Redirect } from 'react-router-dom'


class AddDone extends React.Component {
  state = {
    // backgroundImage: '',
    redirect: false,
    progress: 100,
    timeBeforeRedirect: 5000,
    finishBooking: false
  }

  componentDidMount() {
    //After five seconds to fire render redirect
    if (this.props.match.params.type === 'register' || this.props.match.params.type === 'training' || this.state.finishBooking) {
      setTimeout(() => this.setState({ redirect: true }), this.state.timeBeforeRedirect)
      return  setInterval(() => this.progressReducer(this.state.progress), this.state.timeBeforeRedirect / 100)
    }
  }

  progressReducer = (currentNum) => {
    if (this.state.progress > 0){
      const decrementedNumber = currentNum - 1
      this.setState({ progress: decrementedNumber })
    }
    
  }

  renderRedirect = () => {
    if (this.state.redirect){
      if (this.props.match.params.type === 'training') {
        return <Redirect to="/profile" />
      } else if (this.props.match.params.type === 'register') {
        return  window.location.assign('/portfolio')
      } else if (this.props.match.params.type === 'booking') {
        return  window.location.assign(`/profile/${this.props.match.params.id}`)
      } 
    }
  }

  handleType = () => {
    let showType
    if (this.props.match.params.type === 'training') {
      return showType = 'Training Slot Was Successfully Created'
    } else if (this.props.match.params.type === 'register') {
      return showType = 'Welcome, Your Account Was Successfully Created'
    } 
  }

  finishBooking = async () => {
    await this.setState({ finishBooking: true, timeBeforeRedirect: 700 })
    this.componentDidMount()
  }

  render() {
    return (
      <section className="hero is-light is-fullheight-with-navbar">
        {/* Dont redirect if user just booked the slot */}
        {this.renderRedirect()}
        <div className="hero-body done">
          <div>
            <h1 className="title is-1"> 
              {/* Check what kind of request we want */}
              {this.handleType()} 
            </h1>
            {this.props.match.params.type === 'booking' && 
            <>
              <div className="subtitle done-booking">
            Training Slot Was Succesfully Booked, Instructor Will Send You Zoom Invitation Link 15 Minutes Before Training Started
              </div>
              <button onClick={this.finishBooking}>
                Go Back To The {this.props.match.params.username} Profile
              </button>
            </>
            }
          </div>
          <progress className="progress is-large is-link" value={this.state.progress} max="100"></progress>
        </div>
      </section>
    )
  }
}

export default AddDone