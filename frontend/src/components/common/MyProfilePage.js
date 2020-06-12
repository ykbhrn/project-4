import React from 'react'
import { getPortfolio } from '../../lib/api'
import { isAuthenticated, logout } from '../../lib/auth'
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
    isAthlete: false,
    trainingOwnerId: '',
    trainingOwnerUsername: '',
    showBigPortfolio: false,
    displayPhotoUrl: '',
    displayTitle: '',
    displayUsername: '',
    displayUserId: '',
    displayProfileUrl: '',
    displayDescription: '',
    displayName: '',
    displayDate: '',
    displayTime: '',
    displaySports: '',
    displayBookings: '',
    displayLimit: ''
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

  handleBigPortfolio = (url, title, userId, username, profileUrl, displayDescription ) => {
    this.setState({ showBigPortfolio: true, displayPhotoUrl: url,
      displayTitle: title, displayUserId: userId,
      displayUsername: username, displayProfileUrl: profileUrl,
      displayDescription: displayDescription
    })
  }

  handleBigTrainingPortfolio = (name, date, time, sports, description, bookings, username, userId, limit, profileUrl) => {
    this.setState({ showBigPortfolio: true, displayName: name, displayDate: date, displayTime: time, displaySports: sports,
      displayDescription: description, displayBookings: bookings, displayUsername: username, displayUserId: userId,
      displayLimit: limit, displayProfileUrl: profileUrl })
  }

  hideBig = () => {
    this.setState({ showBigPortfolio: false })
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

  handleLogout = () => {
    logout()
    return  window.location.assign('/')
  }

  handleBookingForm = (limit, bookings) => {
    let capacity

    if (bookings === 0){
      if (limit === 1) {
        return <>
          <div>Capacity Limit: <span className="card-header-title"> Individual Training </span></div>
        </>
      } else if (this.state.isStudent){
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
    if (!this.state.user) return null
    console.log(this.state.user)

    return (
      <section className="section m-scene">

        {this.state.showImages &&
        <Link to={this.portfolioUrl}>
          <img className='add-portfolio' src='/images/addimage.png' />
        </Link>
        }
        {this.state.showVideos &&
        <Link to={this.portfolioUrl}>
          <img className='add-portfolio' src='/images/addvideo.png' />
        </Link>
        }
        {this.state.showArticles &&
        <Link to={this.portfolioUrl}>
          <img className='add-portfolio' src='/images/addarticle.png' />
        </Link>
        }

        {isAuthenticated() && <div onClick={this.handleLogout} className="logout">
          <img src='/images/logout.png' />
        </div>}

        {this.state.showChoices &&
          <>
            <h1 className="title is-2 has-text-centered greeting">{`${this.state.timeMessage} ${this.state.user.username}`}</h1>
            <hr />
          </>
        }
        <div className="profile-choices-container">
          <div className={`${this.state.showChoices ? 'profile-choices' : 'small-profile-choices'}`}
            onClick={() => {
              this.clickShow('training')
            }}
          > 
            {this.state.showChoices && <img src='/images/nexttrainings.png' />}
            <span className={`${this.state.showTrainings ? 'selected-menu-choice' : ''}`}>Next Trainings</span>
          </div>

          <div className={`${this.state.showChoices ? 'profile-choices' : 'small-profile-choices'}`}
            onClick={() => {
              this.clickShow('images')
            }}
          >
            {this.state.showChoices && <img src='/images/yourphotos.png' /> }
            <span className={`${this.state.showImages ? 'selected-menu-choice' : ''}`}>Your Photos</span>
          </div>

          <div className={`${this.state.showChoices ? 'profile-choices' : 'small-profile-choices'}`}
            onClick={() => {
              this.clickShow('videos')
            }}
          > 
            {this.state.showChoices && <img src='/images/yourvideos.png' />}
            <span className={`${this.state.showVideos ? 'selected-menu-choice' : ''}`}>Your Videos</span>
          </div>

          {this.state.isAthlete &&
          <div className={`${this.state.showChoices ? 'profile-choices' : 'small-profile-choices'}`}
            onClick={() => {
              this.clickShow('articles')
            }}
          > 
            {this.state.showChoices && <img src='/images/yourarticles.png' /> }
            <span className={`${this.state.showArticles ? 'selected-menu-choice' : ''}`}>Your Articles</span>
          </div>
          }

        </div>
      
        <div className='portfolio-container'>
          {this.state.showTrainings &&
        <>
          <div className="profile-header">
           
            <img className='profile-image' src={this.state.user.profile_image} />
            
            <div className="title is-2">{this.state.user.username} <br /><span className="subtitle is-5">Booked Trainings</span></div>          </div>
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
                      username={training.owner.username}
                      userId={training.owner.id}
                      sports={training.sports.map(sport => (`${sport.name}  `))}
                      description={training.description}
                      limit={training.limit}
                      bookingForm={this.handleBookingForm}
                      bookings={training.bookings}
                      profileUrl={training.owner.profile_image}
                      handleBigPortfolio={this.handleBigTrainingPortfolio}
                      showBigPortfolio={this.state.showBigPortfolio}
                      hideBig={this.hideBig}
                      displayName={this.state.displayName}
                      displayDate={this.state.displayDate}
                      displayTime={this.state.displayTime}
                      displaySports={this.state.displaySports}
                      displayDescription={this.state.displayDescription}
                      displayBookings={this.state.displayBookings}
                      displayUsername={this.state.displayUsername}
                      displayUserId={this.state.displayUserId}
                      displayLimit={this.state.displayLimit}
                      displayProfileUrl={this.state.displayProfileUrl}
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
                      username={training.owner.username}
                      userId={training.owner.id}
                      sports={training.sports.map(sport => (`${sport.name}  `))}
                      description={training.description}
                      limit={training.limit}
                      bookingForm={this.handleBookingForm}
                      bookings={training.bookings}
                      profileUrl={training.owner.profile_image}
                      handleBigPortfolio={this.handleBigTrainingPortfolio}
                      showBigPortfolio={this.state.showBigPortfolio}
                      hideBig={this.hideBig}
                      displayName={this.state.displayName}
                      displayDate={this.state.displayDate}
                      displayTime={this.state.displayTime}
                      displaySports={this.state.displaySports}
                      displayDescription={this.state.displayDescription}
                      displayBookings={this.state.displayBookings}
                      displayUsername={this.state.displayUsername}
                      displayUserId={this.state.displayUserId}
                      displayLimit={this.state.displayLimit}
                      displayProfileUrl={this.state.displayProfileUrl}
                    />
                  }
                </>
              ))}
            </>
            }

          </div>
        </>
          }

          {this.state.showImages &&
          <>
            <div className="profile-header">
  
              <img className='profile-image' src={this.state.user.profile_image} />
              
              <div className="title is-2">{this.state.user.username} <br /><span className="subtitle is-5">Photos</span></div>            </div>
            <hr />
            <div className="columns is-multiline scene_element scene_element--fadein">
              {this.state.user.images.map(image => (
                <Images
                  key={image.id}
                  id={image.id}
                  title={image.title}
                  url={image.url}
                  description={image.description}
                  username={image.owner.username}
                  userId={image.owner.id}
                  profileUrl={image.owner.profile_image}
                  handleBigPortfolio={this.handleBigPortfolio}
                  showBigPortfolio={this.state.showBigPortfolio}
                  displayPhotoUrl={this.state.displayPhotoUrl}
                  hideBig={this.hideBig}
                  displayTitle={this.state.displayTitle}
                  displayUserId={this.state.displayUserId}
                  displayUsername={this.state.displayUsername}
                  displayProfileUrl={this.state.displayProfileUrl}
                  displayDescription={this.state.displayDescription}
                />
              ))}
            </div>
          </>
          }

          {this.state.showVideos &&
          <>
            <div className="profile-header">
             
              <img className='profile-image' src={this.state.user.profile_image} />
              
              <div className="title is-2">{this.state.user.username} <br /><span className="subtitle is-5">Videos</span></div>            </div>
            <hr />
            <div className="columns is-multiline scene_element scene_element--fadein">

              {this.state.user.videos.map(video => (
                <Videos
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  url={video.url}
                  description={video.description}
                  username={video.owner.username}
                  userId={video.owner.id}
                  profileUrl={video.owner.profile_image}
                  handleBigPortfolio={this.handleBigPortfolio}
                  showBigPortfolio={this.state.showBigPortfolio}
                  displayPhotoUrl={this.state.displayPhotoUrl}
                  hideBig={this.hideBig}
                  displayTitle={this.state.displayTitle}
                  displayUserId={this.state.displayUserId}
                  displayUsername={this.state.displayUsername}
                  displayProfileUrl={this.state.displayProfileUrl}
                  displayDescription={this.state.displayDescription}
                />
              ))}

            </div>
          </>
          }
        </div>

        {this.state.showArticles &&
          <>
            <div className="profile-header">
             
              <img className='profile-image' src={this.state.user.profile_image} />
              
              <div className="title is-2">{this.state.user.username} <br /><span className="subtitle is-5">Articles</span></div>
            </div>
            <div className="article-container">
              {this.state.user.articles.map( article => (
                <div key={article.id}>
                  <div className="card-article">

                    < Link to = {`/portfolio/${article.id}`}> 
                      <img className='image-article' src={article.imageUrl} alt={article.title} />
                    </Link >    
                    
                    <div className='article-text'>
                      < Link to = {`/portfolio/${article.id}`}> 
                        <div className="article-title">{article.title}</div>
                        <div className='article-border'></div>
                      </ Link>
                      <div className="subtitle-article">{article.text}</div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
            <hr />
          </>
        }

      </section>
    )
  }

}
export default ProfilePage