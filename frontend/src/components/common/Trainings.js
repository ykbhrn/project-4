import React from 'react'
import { Link } from 'react-router-dom'

const Trainings = ({ id, name, date, time, sports, description, isFull, bookings, limit }) => (
  < div className="column column is-one-third-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile" >
    <div className="card">
      < Link to={`/trainings/${id}`}>
        <h4 className="card-header-title">{name}</h4>
        <div>Date: <span className="card-header-title">{date}</span></div>
        <div>Time: <span className="card-header-title">{time}</span></div>
        <div>Sport: <span className="card-header-title">{sports}</span></div>
        <div>Description: <span className="card-header-title">{description}</span></div>
        <div>Capacity Limit: <span className="card-header-title">{limit} Students </span></div>
        {bookings &&
        <>
          {isFull &&
          <div>
            Training Is Fully Booked
          </div>
          }
          {!isFull &&
        <div>Booked: <span className="card-header-title">{bookings} Students</span></div>
          }
        </>
        }
      </Link >
    </div>
  </div >
)
export default Trainings