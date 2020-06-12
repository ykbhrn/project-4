import React from 'react'
import { Link } from 'react-router-dom'

const Images = ( { title, url, id, showBigPortfolio, username, userId, description, handleBigPortfolio, displayPhotoUrl, hideBig, profileUrl,
  displayTitle, displayUserId, displayUsername, displayProfileUrl, displayDescription } ) => (
  <>
    <div 
      onClick={() => {
        handleBigPortfolio(url, title, userId, username, profileUrl, description)
      }}
      className = "index-portfolio column is-one-quarter-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile" >
      <figure className="image is-1by1">
        <img src={url} alt={title} />
      </figure>
    
    </div>
    {showBigPortfolio &&    
    <div className="show-big-image">
      <div className="big-image-card">
        <img className="big-image" src={displayPhotoUrl} alt={displayTitle} />
        {/* side of big image container */}
        <div className='big-image-side'>
          <div className="profile-header-index">        
            <Link to={`/profile/${displayUserId}`}>
              <img className='profile-image-index' src={displayProfileUrl}/></Link>
            <Link to={`/profile/${displayUserId}`}>{displayUsername}</Link>
          </div>
          <hr/>
          <div className="big-image-description">
            {displayDescription}
          </div>
          <hr />

        </div>

        <div className='close' onClick={hideBig}> <img src='/images/close.png' /> </div>
      </div>
    </div>
    }
  </>
)
export default Images