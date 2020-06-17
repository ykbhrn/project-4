import React from 'react'
import { getChat, getPortfolio } from '../../lib/api'
import { Link } from 'react-router-dom'


class Chat extends React.Component {
  state = {
    user: null,
    showMessages: false
  }

  async componentDidMount() {
    try {
      const res = await getPortfolio()
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  uniq(a) {
    var seen = {}
    return a.filter(function (item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true)
    })
  }



  render() {
    if (!this.state.user) return null
    // console.log(this.state)
    return (
      <div className="chat-profile-container">
        <div className="chat-profile-side">
          {/* Find Users who i have chat history with */}
          {this.state.user.chats.slice(0).reverse().map(chat => {
            const notCurrentUser = chat.users.filter(user => {
              return user.id !== this.state.user.id
            })
            // const uniq = [ ...new Set(notCurrentUser) ]
            // notCurrentUser.filter((item, index) => notCurrentUser.indexOf(item.id) === index )
            // notCurrentUser.reduce((unique, item) => 
            //   unique.includes(item.id) ? unique : [...unique, item.id], [])
            const uniqueArray = notCurrentUser.filter((thing, index) => {
              const _thing = JSON.stringify(thing)
              return index === notCurrentUser.findIndex(obj => {
                return JSON.stringify(obj) === _thing
              })
            })
            return notCurrentUser.map(userForChat => (
              <div key={userForChat.id} className="profile-header-chat-page">
                <Link to={`/profile/${userForChat.id}`}>
                  <img className='profile-image-index' src={userForChat.profile_image} /></Link>
                <Link to={`/profile/${userForChat.id}`}>{userForChat.username}</Link>
              </div>
            ))
          })}
        </div>

        {/* Chat history with specific user and sending message form*/}
        <div className="messages-section">

          <div className="profile-header profile-messages">
            <img className='profile-image' src={this.state.user.profile_image} />
            <div className="greeting-public"><span className='title is-2'>{this.state.user.username}</span>
              <div className="user-type"><img src={`${this.state.isStudent ? '/images/student.png' : '/images/athlete.png'}`} />
                {this.state.user.user_type.name} 
              </div>
            </div>
          </div>
          
          <div className="chat-history-container">
            <div className="chat-history">

            </div>
          </div>

          <div className="messages-form-container">
            <form onSubmit={(event) => {
              this.handleSubmit(event,)
            }}>
              <input className="input" 
                name='text'
                onChange={this.handleChange}
              />
              <button className="comment-button">Send</button>
            </form>
          </div>       

        </div>

      </div>
    )
  }

}
export default Chat