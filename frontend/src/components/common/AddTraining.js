import React from 'react'
import { Link } from 'react-router-dom'
import SportSelect from '../common/SportSelect'

const Trainings = ( { renderRedirect, handleChange, handleSelect, handleSubmit, handleErrors, name, date, time, description, sports, errorName, errorDate, errorTime, errorDescription, errorSports } ) => (
  
  <section className="section">
    {renderRedirect()}
    <div className="columns">
      <form onSubmit={handleSubmit} className="column">
        <div className="has-text-centered title">Add New Training</div>

        <div className="field">
          <div className="control">
            <input
              className={`input ${errorName ? 'is-danger' : ''}`}
              placeholder="Name of the training"
              name="name"
              onChange={handleChange}
              value={name}
            />
          </div>
          {errorName ? <small className="help is-danger">{errorName}</small> : ''}
        </div>

        <div className="field">
          <div className="control">
            <input
              type='date'
              className={`input ${errorDate ? 'is-danger' : ''}`}
              placeholder="Date Of The Training"
              name="date"
              onChange={handleChange}
              value={date}
            />
          </div>
          {errorDate ? <small className="help is-danger">{errorDate}</small> : ''}
        </div>

        <div className="field">
          <div className="control">
            <input
              type='time'
              className={`input ${errorTime ? 'is-danger' : ''}`}
              placeholder="Training Time"
              name="time"
              onChange={handleChange}
              value={time}
            />
          </div>
          {errorTime && <small className="help is-danger">{errorTime}</small>}
        </div>

        <div className="field">
          <div className="control">
            <input
              className={`input ${errorDescription ? 'is-danger' : ''}`}
              placeholder="Please, Describe Your Training"
              name="description"
              onChange={handleChange}
              value={description}
            />
          </div>
          {errorDescription && <small className="help is-danger">{errorDescription}</small>}
        </div>

        <div className='register-forms'>
          What Is The Training Category? 
          <SportSelect
            handleSelect={handleSelect}
          />
          {errorSports && <small className="help is-danger">{errorSports}</small>}
        </div>

        <div className="field">
          <button type="submit"  className='button is-fullwidth is-dark'>Add Training</button>
        </div>
      </form>
    </div>
  </section>
)
export default Trainings