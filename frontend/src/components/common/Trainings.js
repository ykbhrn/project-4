import React from 'react'
import { Link } from 'react-router-dom'

const Trainings = ( { id, name, date, time, sports, description }) => (
  < div className = "column column is-one-quarter-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile" >
    <div className="card">
      < Link to = {`/trainings/${id}`}>
        <h4 className="card-header-title">{name}</h4>
        <h4 className="card-header-title">{date}</h4>
        <h4 className="card-header-title">{time}</h4>
        <h4 className="card-header-title">{sports}</h4>
        <h4 className="card-header-title">{description}</h4>
      </Link >    
    </div>
  </div >
)
export default Trainings