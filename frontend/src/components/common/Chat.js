import React from 'react'
import { getChat, getPortfolio } from '../../lib/api'
import { Link } from 'react-router-dom'


class Chat extends React.Component {
  state = {
    user: null
  }

  async componentDidMount() {
    try {
      const res = await getPortfolio()
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }



  render() {
    if (!this.state.user) return null
    console.log(this.state)
    return (
      <div>
        {/* Find Users who i have chat history with */}
        {this.state.user.chats.map( chat => {
          const notCurrentUser = chat.users.filter(user => {
            return user.id !== this.state.user.id
          })
          return notCurrentUser.map( userForChat => (
            <div key={userForChat.id} className="profile-header-index">        
              <Link to={`/profile/${userForChat.id}`}>
                <img className='profile-image-index' src={userForChat.profile_image}/></Link>
              <Link to={`/profile/${userForChat.id}`}>{userForChat.username}</Link>
            </div>
          ))
        })}
      </div>
    )
  }

}
export default Chat