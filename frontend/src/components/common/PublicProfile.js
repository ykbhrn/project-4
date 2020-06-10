import React from 'react'
import { getPublicPortfolio } from '../../lib/api'
import { Link } from 'react-router-dom'
import Trainings from './Trainings'
import Images from './Images'
import Videos from './Videos'
import Articles from '../portfolio/Articles'

class PublicProfilePage extends React.Component {

  state = {
    user: null,
    showTrainings: false,
    showImages: true,
    showArticles: false,
    showVideos: false,
    isStudent: false,
    isAthlete: false
  }

  async componentDidMount() {
    try {
      const userId = this.props.match.params.id
      const res = await getPublicPortfolio(userId)
      if (res.data.user_type.id === 1) {
        this.setState({ user: res.data, isStudent: true })
      } else if (res.data.user_type.id === 2) {
        this.setState({ user: res.data, isAthlete: true })
      }
    } catch (err) {
      console.log(err)
    }
  }

  clickShow = (type) => {
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

  render() {
    if (!this.state.user) return null
    console.log(this.state.user)

    return (
      <section className="public-profile-container">
        <div className="profile-header-container">
          <div className="profile-header">
            <img className='profile-image' src={this.state.user.profile_image} />

            <div className="greeting-public"><span className='title is-2'>{this.state.user.username}</span>
              <div className="user-type"><img src={`${this.state.isStudent ? '/images/student.png' : '/images/athlete.png'}`} />{this.state.user.user_type.name}</div>
            </div>
          </div>

          <div className="profile-choices-container">
            <span onClick={() => {
              this.clickShow('images')
            }} className={`small-profile-choices ${this.state.showImages ? 'selected-menu-choice' : ''}`}>Images</span>

            <span onClick={() => {
              this.clickShow('videos')
            }} className={`small-profile-choices ${this.state.showVideos ? 'selected-menu-choice' : ''}`}>Videos</span>
      

            {this.state.isAthlete &&
            <>
              <span onClick={() => {
                this.clickShow('articles')
              }} className={`small-profile-choices ${this.state.showArticles ? 'selected-menu-choice' : ''}`}>Articles</span>
            

              <span onClick={() => {
                this.clickShow('training')
              }} className={`small-profile-choices ${this.state.showTrainings ? 'selected-menu-choice' : ''}`}>Trainings</span>
            </>
            }
          </div>
        </div>
      
        <div className='portfolio-container'>
          {this.state.showTrainings &&
        <>
          <div className="columns is-multiline scene_element scene_element--fadein">
            
            {this.state.user.trainings.map(training => (
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
            ))}            
          </div>
        </>
          }


          {this.state.showImages &&
          <>
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
          </>
          }

        </div>

      </section>
    )
  }

}
export default PublicProfilePage