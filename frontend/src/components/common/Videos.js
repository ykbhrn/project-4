import React from 'react'
import { Link } from 'react-router-dom'

const Videos = ( { title, url, id } ) => (
  < div className = "column column is-one-quarter-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile" >
    < Link to = {`/portfolio/videos/${id}`}>
      <figure className="image is-1by1">
        <img src={url} alt={title} />
      </figure>
    </Link >  
  </div>
)
export default Videos