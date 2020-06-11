import React from 'react'
import { getAllImages, getAllVideos } from '../../lib/api'
import { Link } from 'react-router-dom'
import Images from '../common/Images'
import Videos from '../common/Videos'
import Articles from '../portfolio/Articles'

class IndexPortfolio extends React.Component {
  state = {
    images: [],
    videos: [],
    showImages: true,
    showVideos: false,
    showArticles: false
  }

  async componentDidMount() {
    try {
      const res = await getAllImages()
      const resTwo = await getAllVideos()
      this.setState({ images: res.data, videos: resTwo.data })
    } catch (err) {
      console.log(err)
    }
  }

  clickShow = (type) => {
    if (type === 'videos'){
      this.setState({ showVideos: true, showImages: false, showArticles: false })
    } else if (type === 'images'){
      this.setState({ showImages: true, showVideos: false, showArticles: false })
    } else if (type === 'articles'){
      this.setState({ showArticles: true, showVideos: false, showImages: false })
    }
  }

  portfolioUrl = () => {
    let portfolioUrl
    if (this.state.showImages) {
      return portfolioUrl = '/add/images'
    } else if (this.state.showVideos) {
      return portfolioUrl = '/add/videos'
    } else if (this.state.showArticles) {
      return portfolioUrl = '/newarticle'
    }
  }


  render() {
    // if (!this.state.images) return null
    console.log(this.state.videos)
    return (
      <>
        <section className="m-scene">

          {this.state.showImages &&
        <Link to={this.portfolioUrl}>
          <img className='add-portfolio' src='./images/addimage.png'></img>
        </Link>
          }
          {this.state.showVideos &&
        <Link to={this.portfolioUrl}>
          <img className='add-portfolio' src='./images/addvideo.png'></img>
        </Link>
          }
          {this.state.showArticles &&
        <Link to={this.portfolioUrl}>
          <img className='add-portfolio' src='./images/addarticle.png'></img>
        </Link>
          }

          <div className="profile-choices-container index">
            <span onClick={() => {
              this.clickShow('images')
            }} className={`small-profile-choices ${this.state.showImages ? 'selected-menu-choice' : ''}`}>Images</span>

            <span onClick={() => {
              this.clickShow('videos')
            }} className={`small-profile-choices ${this.state.showVideos ? 'selected-menu-choice' : ''}`}>Videos</span>
      
            <span onClick={() => {
              this.clickShow('articles')
            }} className={`small-profile-choices ${this.state.showArticles ? 'selected-menu-choice' : ''}`}>Articles</span>

          </div>

          <div className="portfolio-container">

            {this.state.showImages &&
              <div className="columns is-multiline scene_element scene_element--fadein">
                {this.state.images.map(image => (
                  <Images
                    key={image.id}
                    id={image.id}
                    title={image.title}
                    url={image.url}
                    description={image.description}
                  />
                ))}
              </div>
            }

            {this.state.showVideos &&
              <div className="columns is-multiline scene_element scene_element--fadein">
                {this.state.videos.map(video => (
                  <Videos
                    key={video.id}
                    id={video.id}
                    title={video.title}
                    url={video.url}
                    description={video.description}
                  />
                ))}
              </div>
            }
              
          </div>
        </section>
        {this.state.showArticles &&
        <Articles />
        }
      </>
    )
  }

}
export default IndexPortfolio