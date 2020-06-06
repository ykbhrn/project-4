import React from 'react'
import { Redirect } from 'react-router-dom'


class NotFound extends React.Component {
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
      return <Redirect to="/" />
    }
  }

  render() {
    return (
      <section className="hero is-dark is-fullheight-with-navbar">
        {this.renderRedirect()}
        <div className="hero-body">
          <div style={{ backgroundColor: 'black' }}>
            <h1 className="title is-1">
              Error 404
            </h1>
            <h2 className="subtitle">
              Page Not Found
            </h2>
      
          </div>
          <progress className="progress is-large is-link" value={this.state.progress} max="100"></progress>
        </div>
      </section>
    )
  }
}

export default NotFound