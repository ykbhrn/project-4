import React from 'react'
import { getAllImages, getAllVideos } from '../../lib/api'
import { Link } from 'react-router-dom'
import Images from '../common/Images'
import Videos from '../common/Videos'
import Articles from '../common/Articles'

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

  render() {
    // if (!this.state.images) return null
    console.log(this.state.videos)
    return (
      <>
        <div className="section">
          <section className="section m-scene">

            <div className="profile-choices-container">

              <div className='small-profile-choices'
                onClick={() => {
                  this.clickShow('images')
                }}
              >
          Photos
              </div>

              <div className='small-profile-choices'
                onClick={() => {
                  this.clickShow('videos')
                }}
              >
          Videos
              </div>
              <div className='small-profile-choices'
                onClick={() => {
                  this.clickShow('articles')
                }}
              >
          Articles
              </div>

            </div>

            <div className="container">

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
        </div>
      </>
    )
  }

}
export default IndexPortfolio