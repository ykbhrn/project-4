import React from 'react'
import { Link } from 'react-router-dom'

const Trainings = ({ id, name, date, time, sports, description, bookings, username, userId, limit, bookingForm }) => (
  < div className="column column is-one-third-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile" >
    <div className="card">
      < Link to={`/trainings/${id}`}>
        <h4 className="card-header-title">{name}</h4>
        <Link to={`/profile/${userId}`}><div>Instructor: <span className="card-header-title">{username}</span></div></Link>
        <div>Date: <span className="card-header-title">{date}</span></div>
        <div>Time: <span className="card-header-title">{time}</span></div>
        <div>Sport: <span className="card-header-title">{sports}</span></div>
        <div>Description: <span className="card-header-title">{description}</span></div>
        {bookingForm(limit, bookings)} 
      </Link >
    </div>
  </div >
)
export default Trainings