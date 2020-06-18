import React from 'react'
import { getPublicPortfolio, bookTraining, postChat } from '../../lib/api'
import { Redirect ,Link } from 'react-router-dom'
import Trainings from './Trainings'
import Images from './Images'
import Videos from './Videos'
import Articles from '../portfolio/Articles'

class PublicProfilePage extends React.Component {

  state = {
    formData: {
      text: ''
    },
    user: null,
    showChat: false,
    showTrainings: false,
    showImages: true,
    showArticles: false,
    showVideos: false,
    isStudent: false,
    isAthlete: false,
    redirect: false,
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
    displayLimit: '',
    displayId: '',
    displayComments: [],
    displayPortfolioId: ''
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

  handleChange = event => {
    console.log('change event: ', event.target.name)
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const userId = this.props.match.params.id
      const response = await postChat(this.state.formData, userId)
      console.log(response.data)  
    } catch (err) {
      console.log('response: ', err.response.data)
    }
    this.setState({ showChat: false })
  }

  handleChat = () => {
    this.setState({ showChat: this.state.showChat === false ? true : false })
  }

  handleBigPortfolio = (url, title, userId, username, profileUrl, displayDescription, comments, id ) => {
    this.setState({ showBigPortfolio: true, displayPhotoUrl: url,
      displayTitle: title, displayUserId: userId, displayUsername: username, displayProfileUrl: profileUrl,
      displayDescription: displayDescription, displayComments: comments, displayPortfolioId: id
    })
  }

  handleBigTrainingPortfolio = (name, date, time, sports, description, bookings, username, userId, limit, profileUrl, id) => {
    this.setState({ showBigPortfolio: true, displayName: name, displayDate: date, displayTime: time, displaySports: sports,
      displayDescription: description, displayBookings: bookings, displayUsername: username, displayUserId: userId,
      displayLimit: limit, displayProfileUrl: profileUrl, displayId: id })
  }

  hideBig = () => {
    this.setState({ showBigPortfolio: false })
  }

  handleBooking = async (id) => {
    try {
      const res = await bookTraining(id)
      this.setState({ redirect: true })
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/done/booking/${this.state.user.id}/${this.state.user.username}`} />
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
    console.log(this.state.formData)

    return (
      <section className="public-profile-container">
        {this.renderRedirect()}
        <div className="profile-header-container">
          <div className="profile-header">

            <img className='profile-image' src={this.state.user.profile_image} />

            <div className="greeting-public"><span className='title is-2'>{this.state.user.username}</span>
              <div className="user-type"><img src={`${this.state.isStudent ? 'https://res.cloudinary.com/djq7pruxd/image/upload/v1592484110/student_rtpzhv.png' : 'https://res.cloudinary.com/djq7pruxd/image/upload/v1592484110/athlete_gwre8y.png'}`} />{this.state.user.user_type.name} | 
                <div className="message" ><img src="https://res.cloudinary.com/djq7pruxd/image/upload/v1592484110/message_ffjyj2.png" onClick={this.handleChat}/>
                  {this.state.showChat && 
                    <div className="chat-profile-form">
                      <div className="profile-header-chat">              
                        <img className='profile-image-index' src={this.state.user.profile_image}/>
                        {this.state.user.username}  <span className='close-message' onClick={this.handleChat}> X </span>
                      </div>

                      <form onSubmit={(event) => {
                        this.handleSubmit(event,)
                      }}>
                        <input className="input" 
                          name='text'
                          onChange={this.handleChange}
                        />
                        <button className="comment-button">Send</button>
                      </form>
                     
                    </div>
                  }
                </div>
              </div>
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
                  <>
                    {!training.isFull &&
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
                         handleBooking={this.handleBooking}
                         bookTimeSlot={true}
                         displayId={this.state.displayId}
                         trainingPage={false}
                       />
                    }
                  </>
                ))}
              </div>
            </>
          }

          {this.state.showImages &&
            <>
              <div className="columns is-multiline scene_element scene_element--fadein">
                {this.state.user.images.slice(0).reverse().map(image => (
                  <Images
                    key={image.id}
                    id={image.id}
                    title={image.title}
                    url={image.url}
                    description={image.description}
                    username={image.owner.username}
                    userId={image.owner.id}
                    comments={image.comments}
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
                    displayPortfolioId={this.state.displayPortfolioId}
                    displayComments={this.state.displayComments.slice(0).reverse().map( comment => (
                      <div className='single-comment' key={comment.id}> 
                        <div className="profile-header-comment">        
                          <Link to={`/profile/${comment.owner.id}`}>
                            <img className='profile-image-comment' src={comment.owner.profile_image}/></Link>
                          <Link to={`/profile/${comment.owner.id}`}>{comment.owner.username}</Link>
                        </div> {comment.text}
                      </div>
                    ))}
                  />
                ))}
              </div>
            </>
          }

          {this.state.showVideos &&
            <>
              <div className="columns is-multiline scene_element scene_element--fadein">

                {this.state.user.videos.slice(0).reverse().map(video => (
                  <Videos
                    key={video.id}
                    id={video.id}
                    title={video.title}
                    url={video.url}
                    description={video.description}
                    username={video.owner.username}
                    userId={video.owner.id}
                    profileUrl={video.owner.profile_image}
                    comments={video.comments}
                    handleBigPortfolio={this.handleBigPortfolio}
                    showBigPortfolio={this.state.showBigPortfolio}
                    displayPhotoUrl={this.state.displayPhotoUrl}
                    hideBig={this.hideBig}
                    displayTitle={this.state.displayTitle}
                    displayUserId={this.state.displayUserId}
                    displayUsername={this.state.displayUsername}
                    displayProfileUrl={this.state.displayProfileUrl}
                    displayDescription={this.state.displayDescription}
                    displayPortfolioId={this.state.displayPortfolioId}
                    displayComments={this.state.displayComments.map( comment => (
                      <div className='single-comment' key={comment.id}> 
                        <div className="profile-header-comment">        
                          <Link to={`/profile/${comment.owner.id}`}>
                            <img className='profile-image-comment' src={comment.owner.profile_image}/></Link>
                          <Link to={`/profile/${comment.owner.id}`}>{comment.owner.username}</Link>
                        </div> {comment.text}
                      </div>
                    ))}
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