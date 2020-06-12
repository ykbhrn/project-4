import React from 'react'
import { Link } from 'react-router-dom'

const Images = ( { title, url, id, showBigPortfolio, handleBigPortfolio, displayPhotoUrl, hideBig } ) => (
  <>
    <div 
      onClick={() => {
        handleBigPortfolio(url)
      }}
      className = "column is-one-quarter-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile" >
      {/* < Link to = {`/portfolio/${id}`}> */}
      <figure className="image is-1by1">
        <img src={url} alt={title} />
      </figure>
      {/* </Link >  */}
    
    </div>
    {showBigPortfolio &&    
    <div className="show-big-image">
      <div className="big-image-card">
        <img className="big-image" src={displayPhotoUrl} alt={title} />
        <div className='big-image-description'>
          <div onClick={hideBig}>xxxx</div>
        </div>
      </div>
    </div>
    }
  </>
)
export default Images