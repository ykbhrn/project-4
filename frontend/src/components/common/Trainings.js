import React from 'react'
import { Link } from 'react-router-dom'

const Trainings = ({ id, name, date, time, sports, description, bookings, username, userId, limit, bookingForm, 
  showBigPortfolio ,handleBigPortfolio, hideBig, profileUrl, displayName, displayDate, displayTime, displaySports,
  displayDescription, displayBookings, displayUsername, displayUserId, displayLimit, displayProfileUrl, handleBooking, 
  bookTimeSlot, displayId, trainingPage }) => (
  <>
    <div 
      onClick={() => {
        handleBigPortfolio(name, date, time, sports, description, bookings, username, userId, limit, profileUrl, id)
      }}
      className="index-portfolio column column is-one-third-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile" >
      <div className="card">
        <h4 className="card-header-title">{name}</h4>
        <div>Date: <span className="card-header-title">{date}</span></div>
        <div>Time: <span className="card-header-title">{time}</span></div>
        <div>Sport: <span className="card-header-title">{sports}</span></div>
      </div>
    </div >
    {showBigPortfolio &&    
    <div className="show-big-training">
      <div className="big-training-card">
        <div className='big-training-side'>
          <div className="profile-header-training">        
            <Link to={`/profile/${displayUserId}`}>
              <img className='profile-image-index' src={displayProfileUrl}/></Link>
            <Link to={`/profile/${displayUserId}`}>{displayUsername}</Link>
          </div>
          <hr/>
          <div className="training-description">
            <h4 className="training-title title is-3 has-text-centered">{displayName}</h4>
            <Link to={`/profile/${userId}`}>Instructor: <span className="card-header-title">{displayUsername}</span></Link>
           Date: <span className="card-header-title">{displayDate}</span>
            Time: <span className="card-header-title">{displayTime}</span>
            Sport: <span className="card-header-title">{displaySports}</span> <br />
            {bookingForm(displayLimit, displayBookings)} 
            <div>Description: <span className="card-header-title">{displayDescription}</span></div>     
          </div>
          <hr />
          {bookTimeSlot &&
          <>
            {trainingPage && 
            <div className="field">
              <button
                onClick={() => {
                  handleBooking(displayId, displayUserId, displayUsername)
                }}
                className='button is-fullwidth is-dark'>Book Time Slot</button>
            </div>
            }
            {!trainingPage && 
            <div className="field">
              <button
                onClick={() => {
                  handleBooking(displayId)
                }}
                className='button is-fullwidth is-dark'>Book Time Slot</button>
            </div>
            }
          </>
          }

          <style>
            {'\
            .navbar{\
              opacity: 0.5;\
            }\
            // .big-image{\
            //   opacity: 2;\
            // }\
            .m-scene .image, .index-video, .card{\
              opacity: 0.5;\
            }\
            '}
          </style>
          

        </div>

        <div className='close-training' onClick={hideBig}> <img src='/images/close.png' /> </div>
      </div>
    </div>
    }
  </>
)
export default Trainings