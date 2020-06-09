import React from 'react'
import { getPortfolio } from '../../lib/api'
import { Link } from 'react-router-dom'
import Trainings from './Trainings'
import Images from './Images'
import Videos from './Videos'
import Articles from '../portfolio/Articles'

class ProfilePage extends React.Component {

  state = {
    user: null,
    timeMessage: '',
    showTrainings: false,
    showImages: false,
    showArticles: false,
    showVideos: false,
    showChoices: true,
    bookedTraining: false,
    isStudent: false,
    isAthlete: false
  }

  async componentDidMount() {
    try {
      const res = await getPortfolio()
      this.timeOfDay()
      if (res.data.user_type === 1) {
        this.setState({ user: res.data, isStudent: true })
      } else if (res.data.user_type === 2) {
        this.setState({ user: res.data, isAthlete: true })
      }
    } catch (err) {
      console.log(err)
    }
  }

  timeOfDay = () => {
    const date = new Date()
    const hour = date.getHours()
    let message = ''
    console.log('hour: ', hour)
    if (hour < 12) {
      message = 'Good Morning'
    } else if (hour >= 12 && hour < 17) {
      message = 'Good Afternoon'
    } else {
      message = 'Good Evening'
    }
    this.setState({ timeMessage: message })
  }

  clickShow = (type) => {
    this.setState({ showChoices: false })
    if (type === 'training') {
      this.setState({ showTrainings: true, showArticles: false, showImages: false, showVideos: false })
    } else if (type === 'images') {
      this.setState({ showImages: true, showTrainings: false, showVideos: false, showArticles: false })
    } else if (type === 'videos') {
      this.setState({ showVideos: true, showTrainings: false, showImages: false, showArticles: false })
    } else if (type === 'articles') {
      this.setState({ showArticles: true, showImages: false, showTrainings: false, showVideos: false })
    }
  }

  handleBookedTraining = (booking) => {
    if (booking > 0) {
      return true
    } else if (booking == 0) {
      return false
    }
  }

  handleAdd = () => {
    if (this.state.showArticles || this.state.showVideos || this.state.showImages) {
      return true
    } else {
      return false
    }
  }

  portfolioUrl = () => {
    let portfolioUrl
    if (this.state.showImages) {
      return portfolioUrl = '/add/images'
    } else if (this.state.showVideos) {
      return portfolioUrl = '/add/videos'
    } else if (this.state.showArticles) {
      return portfolioUrl = '/newarticle'
    }
  }


  render() {
    if (!this.state.user) return null
    console.log(this.state.user.trainings)

    return (
      <section className="section m-scene">
        {this.handleAdd() &&
        <Link to={this.portfolioUrl}>
          <div className='add-portfolio'>
            <img src='./images/add.png'></img>
          </div>
        </Link>
        }

        {this.state.showChoices &&
          <>
            <h1 className="title is-2 has-text-centered">{`${this.state.timeMessage} ${this.state.user.username}`}</h1>
            <hr />
          </>
        }
        <div className="profile-choices-container">
          <div className={`${this.state.showChoices ? 'profile-choices' : 'small-profile-choices'}`}
            onClick={() => {
              this.clickShow('training')
            }}
          > <span className={`${this.state.showTrainings ? 'selected-menu-choice' : ''}`}>Next Trainings</span>
          </div>

          <div className={`${this.state.showChoices ? 'profile-choices' : 'small-profile-choices'}`}
            onClick={() => {
              this.clickShow('images')
            }}
          > <span className={`${this.state.showImages ? 'selected-menu-choice' : ''}`}>Your Photos</span>
          </div>

          <div className={`${this.state.showChoices ? 'profile-choices' : 'small-profile-choices'}`}
            onClick={() => {
              this.clickShow('videos')
            }}
          > <span className={`${this.state.showVideos ? 'selected-menu-choice' : ''}`}>Your Videos</span>
          </div>

          {this.state.isAthlete &&
          <div className={`${this.state.showChoices ? 'profile-choices' : 'small-profile-choices'}`}
            onClick={() => {
              this.clickShow('articles')
            }}
          > <span className={`${this.state.showArticles ? 'selected-menu-choice' : ''}`}>Your Articles</span>
          </div>
          }
        </div>
      
        <div className='portfolio-container'>
          {this.state.showTrainings &&
        <>
  
          <h1 className="title is-2 has-text-centered">Next Booked Trainings</h1>
          <hr />
          <div className="columns is-multiline scene_element scene_element--fadein">

            {this.state.isAthlete &&
            <>
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
                      username={training.owner.username}
                    />
                  }
                </>
              ))}
            </>
            }

            {this.state.isStudent &&
            <>
              {this.state.user.student_trainings.map(training => (
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
                      username={training.owner.username}
                    />
                  }
                </>
              ))}
            </>
            }

          </div>
        </>
          }

          {/* {this.state.showOtherTrainings &&
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
                  sports={training.sports.map(sport => ( `${sport.name}  `))}
                  description={training.description}
                  username={training.owner.username}
                />
                  }
                </>
              ))}
            
            </div>
          </>
        }  */}

          {this.state.showImages &&
          <>
            <h1 className="title is-2 has-text-centered">Your Photos</h1>
            <hr />
            <div className="columns is-multiline scene_element scene_element--fadein">
              {this.state.user.images.map(image => (
                <Images
                  key={image.id}
                  id={image.id}
                  title={image.title}
                  url={image.url}
                  description={image.description}
                />
              ))}
            </div>
          </>
          }

          {this.state.showVideos &&
          <>
            <h1 className="title is-2 has-text-centered">Your Videos</h1>
            <hr />
            <div className="columns is-multiline scene_element scene_element--fadein">

              {this.state.user.videos.map(video => (
                <Videos
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  url={video.url}
                  description={video.description}
                />
              ))}

            </div>
          </>
          }

          {this.state.showArticles &&
          <>
            <h1 className="title is-2 has-text-centered">Your Articles</h1>
            <hr />
          </>
          }

        </div>

      </section>
    )
  }

}
export default ProfilePage