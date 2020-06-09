import React from 'react'
import { getAllArticles } from '../../lib/api'
import { Link } from 'react-router-dom'

class Articles extends React.Component {
  state = {
    articles: []
  }

  async componentDidMount() {
    try {
      const res = await getAllArticles()
      this.setState({ articles: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    // if (!this.state.images) return null
    console.log(this.state.articles)
    return (
      <div className="columns is-multiline scene_element scene_element--fadein">
        {this.state.articles.map( article => (
          <div 
            key={article.id}
            className = "column column is-one-quarter-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile" >
            <div className="card-article">
              {/* < Link to = {`/portfolio/${id}`}> */} 
              <figure className="image is-1by1">
                <img src={article.imageUrl} alt={article.title} />
              </figure>
              {/* </Link >     */}
              <div className="title-article-image title is-5">{article.title}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }

}
export default Articles