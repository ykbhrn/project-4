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
    showChoices: true
  }

  async componentDidMount() {
    try {
      const res = await getPortfolio()
      this.timeOfDay()
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  timeOfDay = () => {
    const date = new Date()
    const hour = date.getHours()
    let message = ''
    console.log('hour: ', hour)
    if (hour < 12){
      message = 'Good Morning'
    } else if (hour >= 12 && hour < 17){
      message = 'Good Afternoon'
    } else {
      message = 'Good Evening'
    }
    this.setState({ timeMessage: message })
  }

  clickShow = (type) => {
    this.setState({ showChoices: false })
    if (type === 'training'){
      this.setState({ showTrainings: true, showArticles: false, showImages: false, showVideos: false })
    } else if (type === 'images'){
      this.setState({ showImages: true, showTrainings: false, showVideos: false, showArticles: false })
    } else if (type === 'videos'){
      this.setState({ showVideos: true, showTrainings: false, showImages: false, showArticles: false })
    } else if (type === 'articles'){
      this.setState({ showArticles: true, showImages: false, showTrainings: false, showVideos: false })
    }
  }

  render() {
    if (!this.state.user) return null
    console.log(this.state.user)

    return (
      <section className="section m-scene">
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
          >
            <span className={`${ this.state.showTrainings ? 'selected-menu-choice' : ''}`}>Next Trainings</span>
          </div>
          <div className={`${this.state.showChoices ? 'profile-choices' : 'small-profile-choices'}`}
            onClick={() => {
              this.clickShow('images')
            }}
          >
            <span className={`${ this.state.showImages ? 'selected-menu-choice' : ''}`}>Your Photos</span>
          </div>
          <div className={`${this.state.showChoices ? 'profile-choices' : 'small-profile-choices'}`}
            onClick={() => {
              this.clickShow('videos')
            }}
          >
            <span className={`${ this.state.showVideos ? 'selected-menu-choice' : ''}`}>Your Videos</span>
          </div>
          <div className={`${this.state.showChoices ? 'profile-choices' : 'small-profile-choices'}`}
            onClick={() => {
              this.clickShow('articles')
            }}
          >
            <span className={`${ this.state.showArticles ? 'selected-menu-choice' : ''}`}>Your Articles</span>
          </div>
        </div>

        
        {this.state.showTrainings &&
        <>
          <h1 className="title is-2 has-text-centered">Next Trainings</h1>
          <hr />  
          <div className="columns is-multiline scene_element scene_element--fadein">

            {this.state.user.trainings.map(training => (
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
            ))}
            
          </div>
        </>
        } 
      
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
       
        

      </section>
    )
  }

}
export default ProfilePage