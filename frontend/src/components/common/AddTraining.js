import React from 'react'
import { Link } from 'react-router-dom'
import SportSelect from '../common/SportSelect'

const Trainings = ( { renderRedirect, handleChange, handleSelect, handleSubmit, handleErrors, name, date, time, description, sports, limit, errorName, errorDate, errorTime, errorDescription, errorSports } ) => (
  
  <div className="register-container">
    {renderRedirect()}
    <div className="register-section add-training">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <div className="field">
            <label className="label">Training Name:</label>    
            <input
              className={`input ${errorName ? 'is-danger' : ''}`}
              placeholder="Name of the training"
              name="name"
              onChange={handleChange}
              value={name}
            />
            {errorName ? <small className="help is-danger">{errorName}</small> : ''}
          </div>

          <div className="field">
            <label className="label">Date:</label>    
            <input
              type='date'
              className={`input ${errorDate ? 'is-danger' : ''}`}
              placeholder="Date Of The Training"
              name="date"
              onChange={handleChange}
              value={date}
            />
            {errorDate ? <small className="help is-danger">{errorDate}</small> : ''}
          </div>

        </div>

        <div className="input-container">

          <div className="field">
            <label className="label">Time:</label>    
            <input
              type='time'
              className={`input ${errorTime ? 'is-danger' : ''}`}
              placeholder="Training Time"
              name="time"
              onChange={handleChange}
              value={time}
            />
            {errorTime && <small className="help is-danger">{errorTime}</small>}
          </div>

          <div className="field">
            <label className="label">Students Capacity Limit:</label>    
            <input
              type='number'
              className='input'
              placeholder="Training Capacity Limit"
              name="limit"
              onChange={handleChange}
              value={limit}
            />

          </div>

        </div>

        <div className="input-container">

          <div className="field">
            <label className="label">Description:</label>    
            <input
              className={`input ${errorDescription ? 'is-danger' : ''}`}
              placeholder="Describe Your Training"
              name="description"
              onChange={handleChange}
              value={description}
            />
            {errorDescription && <small className="help is-danger">{errorDescription}</small>}
          </div>

          <div className='register-forms field category'>
            <label className="label">Training Category</label>
            <SportSelect
              handleSelect={handleSelect}
            />
            {errorSports && <small className="help is-danger">{errorSports}</small>}
          </div>

        </div>

        <div className="field">
          <button type="submit"  className='button'>Add Training</button>
        </div>
      </form>
    </div>
  </div>
)
export default Trainings