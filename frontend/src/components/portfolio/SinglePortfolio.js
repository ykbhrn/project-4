
import React from 'react'
// import { Link } from 'react-router-dom' 
import { getSingleImage, getSingleVideo } from '../../lib/api'


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
          <h2 className="title has-text-centered">{portfolio.title}</h2>
          <hr />
          <div className="columns scene_element scene_element--fadein">
            <div className="column is-half">
              <figure className="image">
                <img className="show-image" src={portfolio.url} alt={portfolio.title} />
              </figure>
              <br />
            </div>
            <div className="column is-half">
              <h4 className="title is-4">Description</h4>
              <p>{portfolio.description}</p>
              <hr />
              <div className="added-by">
                <h4 className="title is-6">Added By</h4>
              </div>
      
              {/* <Link to={`/profile/${plant.user._id}`}> */}
              <p>{portfolio.owner.username}</p>
              {/* </Link> */}
              <hr />
            </div>
          </div>
        </div>
      </section>
    )
  }

}

export default SinglePortfolio