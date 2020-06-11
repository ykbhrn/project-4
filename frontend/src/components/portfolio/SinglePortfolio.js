
import React from 'react'
// import { Link } from 'react-router-dom' 
import { getSingleImage, getSingleVideo } from '../../lib/api'
import { Link } from 'react-router-dom'


class SinglePortfolio extends React.Component {
  state = {
    portfolio: null
  }

  async componentDidMount() {
    try {
      if (this.props.match.params.videos) {
        const videoId = this.props.match.params.id
        const res = await getSingleVideo(videoId)
        return this.setState({ portfolio: res.data }) 
      } else {
        const imageId = this.props.match.params.id
        const res = await getSingleImage(imageId)
        return this.setState({ portfolio: res.data })
      }
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }
  


  render() {
    if (!this.state.portfolio) return null 
    console.log(this.state)
    const { portfolio } = this.state
    return (
      <section className="section m-scene">
        <div className="container">

          <Link to={`/profile/${portfolio.owner.id}`}>
            <h2 className="title has-text-centered">{portfolio.owner.username}</h2>
          </Link>
          <hr />
          
          <div className="columns scene_element scene_element--fadein">
            <div className="column is-half">
              <figure className="image">
                <img className="show-image" src={portfolio.url} alt={portfolio.title} controls/>
              </figure>
              <br />
            </div>

            <div className="column is-half">
              <h4 className="title is-4">Description</h4>
              <p>{portfolio.description}</p>
            </div>

          </div>
        </div>
      </section>
    )
  }

}

export default SinglePortfolio