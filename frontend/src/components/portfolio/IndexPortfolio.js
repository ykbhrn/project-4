import React from 'react'
import { getAllImages, getAllVideos } from '../../lib/api'
import { Link } from 'react-router-dom'

class IndexPortfolio extends React.Component {
  state = {
    images: [],
    videos: []
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

  render() {
    // if (!this.state.images) return null
    console.log(this.state.videos)
    return (
      <>
        <div className="section">
          <section className="section m-scene">
            <div className="container">
              <div className="columns is-multiline scene_element scene_element--fadein">
              Images:
                {this.state.images.map(image => (
                  <div 
                    key={image.id}
                    className="column column is-one-quarter-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile">
                    <div className="card">  
                      <Link to={`/portfolio/${image.id}`}>   
                        <div>
                          <div className="card-header">
                            <h4 className="card-header-title">{image.title}</h4>
                          </div>
                          <div className="card-image">
                            <figure className="image image is-1by1">
                              <img src={image.url} alt={image.title} />
                            </figure>
                          </div>
                        </div>   
                      </Link>                
                    </div>
                  </div>
                ))}
              </div>
              <div className="columns is-multiline scene_element scene_element--fadein">
                 Videos:
                {this.state.videos.map(video => (
                  <div 
                    key={video.id}
                    className="column column is-one-quarter-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile">
                    <div className="card">  
                      <Link to={`/portfolio/videos/${video.id}`}>   
                        <div>
                          <div className="card-header">
                            <h4 className="card-header-title">{video.title}</h4>
                          </div>
                          <div className="card-image">
                            <figure className="image image is-1by1">
                              <img src={video.url} alt={video.title} />
                            </figure>
                          </div>
                        </div>   
                      </Link>                
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          </section>
        </div>
      </>
    )
  }

}
export default IndexPortfolio