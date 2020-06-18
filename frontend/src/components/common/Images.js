import React from 'react'
import { Link } from 'react-router-dom'
import { postComment, getSingleImage } from '../../lib/api'

class Images extends React.Component{

  state = {
    formData: {
      text: '',
      image: ''
    },
    comments: [],
    displayNewComments: false
  }

  async getData(imageId) { //* this function can be called whenever you need to update the info on the page
    try {
      const res = await getSingleImage(imageId)
      this.setState({ comments: res.data.comments, displayNewComments: true })
      // console.log(this.state.coments)
    } catch (error) {
      console.log(error)
      // this.props.history.push('/notfound')
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }

  handleSubmit = async (event, displayPortfolioId) => {
    event.preventDefault()
    try {
      const formData = {
        ...this.state.formData, image: displayPortfolioId
      }
      // await this.setState({ formData })
      const response = await postComment(formData)
      //reset formdata text ....it need to be in this way because there is two "text" in state and if i put just "text" than it reset wrong one
      const textData = {
        ...this.state.formData, text: ''
      }
      this.setState({ formData: textData })
      console.log(response)
      
    } catch (err) {
      console.log('response: ', err.response.data)
    }
    this.getData(displayPortfolioId)
  }

  hideNewComments = () => {
    this.setState({ displayNewComments: false })
  }

  render ( ) {   
    console.log(this.state)
    
    const { title, url, id, showBigPortfolio, username, userId, description, handleBigPortfolio, displayPhotoUrl, hideBig, profileUrl,
      displayTitle, displayUserId, displayUsername, displayProfileUrl, displayDescription, comments,
      displayComments, displayPortfolioId } = this.props
    return (
      <>
        <div 
          onClick={() => {
            handleBigPortfolio(url, title, userId, username, profileUrl, description, comments, id)
          }}
          className = "index-portfolio column is-one-quarter-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile" >
          {/* {comments.map(singleComment => {
            return singleComment.text
          })} */}
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
            <hr className="hr-comment"/>
            <div className="description-and-comments">
              <div className="big-image-description">
                {displayDescription} 
              </div>
              <hr className="hr-comment"/>
  
              <div className="show-comments">
                {!this.state.displayNewComments &&
              <>
                {displayComments} 
              </>
                }
                {this.state.displayNewComments &&
              <>
                {this.state.comments.slice(0).reverse().map( comment => (
                  <div className='single-comment' key={comment.id}> 
                    <div className="profile-header-comment">        
                      <Link to={`/profile/${comment.owner.id}`}>
                        <img className='profile-image-comment' src={comment.owner.profile_image}/></Link>
                      <Link to={`/profile/${comment.owner.id}`}>{comment.owner.username}</Link>
                    </div> {comment.text}
                  </div>
                ))}
              </>
                }
              </div>
            </div>

            <div className="post-comment">
              <form onSubmit={(event) => {
                this.handleSubmit(event, displayPortfolioId)
              }}>
                <div className="comment-add-container">
                  <input className="input"
                    placeholder="..."
                    name="text"
                    value={this.state.formData.text}
                    onChange={this.handleChange}
                  />
                  <button className="comment-button" type="submit">Post</button>
                </div>
              </form>

            </div>
  
            <style>
              {'\
              .navbar{\
                opacity: 0.5;\
              }\
              .m-scene .image, .index-video{\
                opacity: 0.5;\
              }\
              '}
            </style>
  
          </div>
          <div onClick={this.hideNewComments}>
            <div className='close' onClick={hideBig}> <img src='https://res.cloudinary.com/djq7pruxd/image/upload/v1592484109/close_eo3yn4.png' /> </div>
          </div>
        </div>
      </div>
        }
      </>
    )
  }
  
}
export default Images

