import React from 'react'
import { Redirect } from 'react-router-dom'


class AddDone extends React.Component {
  state = {
    // backgroundImage: '',
    redirect: false,
    progress: 100
  }

  componentDidMount() {
    const timeBeforeRedirect = 5000
    //After five seconds to fire render redirect
    setTimeout(() => this.setState({ redirect: true }), timeBeforeRedirect)
    setInterval(() => this.progressReducer(this.state.progress), timeBeforeRedirect / 100)
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
        return <Redirect to="/portfolio" />
      } else if (this.props.match.params.type === 'booking') {
        return <Redirect to="/profile" />
      }
      
    }
  }

  handleType = () => {
    let showType
    if (this.props.match.params.type === 'training') {
      return showType = 'Training Slot Was Successfully Created'
    } else if (this.props.match.params.type === 'register') {
      return showType = 'Welcome, Your Account Was Successfully Created'
    }  else if (this.props.match.params.type === 'booking') {
      return showType = 'Training Slot Was Booked, Enjoy Your Training'
    } 
  }

  render() {
    return (
      <section className="hero is-light is-fullheight-with-navbar">
        {this.renderRedirect()}
        <div className="hero-body done">
          <div>
            <h1 className="title is-1">
              {this.handleType()} 
            </h1>
            <h2 className="subtitle">
              
            </h2>
      
          </div>
          <progress className="progress is-large is-link" value={this.state.progress} max="100"></progress>
        </div>
      </section>
    )
  }
}

export default AddDone