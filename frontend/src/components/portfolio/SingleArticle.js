
import React from 'react'
// import { Link } from 'react-router-dom' 
import { getSingleArticle } from '../../lib/api'
import { Link } from 'react-router-dom'


class SingleArticle extends React.Component {
  state = {
    article: null
  }

  async componentDidMount() {
    try {
      const articleId = this.props.match.params.id
      const res = await getSingleArticle(articleId)
      return this.setState({ article: res.data }) 
      
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }
  


  render() {
    if (!this.state.article) return null 
    console.log(this.state.article)
    const { article } = this.state
    return (
      <div className="single-article-container">
        <span className='single-article-author'>
          <Link to={`/profile/${article.owner.id}`}>{article.owner.username}</Link>
        </span>
        <div className="title has-text-centered single-article-title">{article.title}</div>
        <hr />
        {article.titleImageUrl &&
        <div style={{ backgroundImage: `url(${article.titleImageUrl})` }} className="article-image-container">
        </div>
        }

        <div className="single-article-text">
          <p>{article.text}</p>
        </div>

      </div>
    )
  }

}

export default SingleArticle