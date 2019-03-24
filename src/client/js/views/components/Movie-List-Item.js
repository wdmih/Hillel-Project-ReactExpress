import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class MovieListItem extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    let { poster_path, slug, title } = this.props.item
    return (
      <article className="movies-list__item">
        <Link to={'/detail/' + slug} style={{ backgroundImage: `url(${poster_path})` }}>
          <div className="movie-title">
            <h2>{title}</h2>
          </div>
        </Link>
      </article>
    )
  }
}

MovieListItem.propTypes = {
  item: PropTypes.object
}
