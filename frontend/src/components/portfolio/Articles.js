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
      <div className="article-container">
        {this.state.articles.map( article => (
          <div key={article.id}>
            <div className="card-article">

              {/* < Link to = {`/portfolio/${id}`}> */} 
              <div className="article-title-image-container">
                <img className='image-article' src={article.imageUrl} alt={article.title} />
                {/* </Link >     */}
                <div className="title-article title is-5">{article.title}</div>
              </div>

              <div className="article-subtitle">{article.text}</div>

            </div>
          </div>
        ))}
      </div>
    )
  }

}
export default Articles