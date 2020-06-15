import React from 'react'
import { Link } from 'react-router-dom'
import { postComment, getSingleVideo } from '../../lib/api'

class Videos extends React.Component{

  state = {
    formData: {
      text: '',
      video: ''
    },
    comments: [],
    displayNewComments: false
  }

  async getData(videoId) { //* this function can be called whenever you need to update the info on the page
    try {
      const res = await getSingleVideo(videoId)
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
        ...this.state.formData, video: displayPortfolioId
      }
      // await this.setState({ formData })
      const response = await postComment(formData)
      this.setState({ text: '' })
      console.log(response)
      
    } catch (err) {
      console.log('response: ', err.response.data)
    }
    this.getData(displayPortfolioId)
  }

  render ( ) {   
    console.log(this.state.comments)
    
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
         
          <video className="index-video" src={url} alt={title} />
          
        </div>
        {showBigPortfolio &&    
      <div className="show-big-image">

        <div className="big-image-card">
          <video className="big-image" src={displayPhotoUrl} alt={displayTitle} controls/>
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
                  <button className="comment-button" type="submit">Add</button>
                </div>
              </form>

            </div>
  
            <style>
              {'\
              .navbar{\
                opacity: 0.5;\
              }\
              // .big-image{\
              //   opacity: 2;\
              // }\
              .m-scene .image, .index-video{\
                opacity: 0.5;\
              }\
              '}
            </style>
  
          </div>
  
          <div className='close' onClick={hideBig}> <img src='/images/close.png' /> </div>
        </div>
      </div>
        }
      </>
    )
  }
  
}
export default Videos


