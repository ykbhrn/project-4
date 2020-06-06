import React from 'react'
import { getPortfolio } from '../../lib/api'
import { Link } from 'react-router-dom'


class ProfilePage extends React.Component {

  state = {
    user: null,
    timeMessage: ''
  }

  async componentDidMount() {
    try {
      const res = await getPortfolio()
      this.timeOfDay()
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  timeOfDay = () => {
    const date = new Date()
    const hour = date.getHours()
    let message = ''
    console.log('hour: ', hour)
    if (hour < 12){
      message = 'Good Morning'
    } else if (hour >= 12 && hour < 17){
      message = 'Good Afternoon'
    } else {
      message = 'Good Evening'
    }
    this.setState({ timeMessage: message })
  }

  render() {
    if (!this.state.user) return null
    console.log(this.state.user)

    return (
      <section className="section m-scene">
        <h1 className="title is-2 has-text-centered">{`${this.state.timeMessage} ${this.state.user.username}`}</h1>
        <hr />
        <div className="container">
          <div>
          </div>
          <br />
          <div className="columns is-multiline scene_element scene_element--fadein">
            Your Images:
            {this.state.user.images.map(image => (
              < div 
                key={image.id}
                className = "column column is-one-quarter-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile" >
                <div className="container">
                </div>
                < Link to = {`/portfolio/${image.id}`}>
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-header-title">{image.title.length > 17 ? `${image.title.split('').splice(0, 17).join('')}...` : image.title}</h4>
                    </div>
                    <div className="card-image">
                      <figure className="image is-1by1">
                        <img src={image.url} alt={image.url} />
                      </figure>
                    </div>
                  </div>
                </Link >    
              </div >
            ))}
          </div>
          
          <div className="columns is-multiline scene_element scene_element--fadein">
            Your Videos:
            {this.state.user.videos.map(video => (
              < div 
                key={video.id}
                className = "column column is-one-quarter-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile" >
                <div className="container">
                </div>
                < Link to = {`/portfolio/${video.id}`}>
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-header-title">{video.title.length > 17 ? `${video.title.split('').splice(0, 17).join('')}...` : video.title}</h4>
                    </div>
                    <div className="card-image">
                      <figure className="image is-1by1">
                        <img src={video.url} alt={video.url} />
                      </figure>
                    </div>
                  </div>
                </Link >    
              </div >
            ))}
          </div>
          
        </div>
        <div>
         
        </div>

      </section>
    )
  }

}
export default ProfilePage