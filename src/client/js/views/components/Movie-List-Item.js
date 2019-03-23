import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class MovieListItem extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <article className="movies-list__item">
        <Link to={'/detail/' + this.props.item.slug} style={{ backgroundImage: `url(${this.props.item.poster_path})` }}>
          <div className="movie-title">
            <h2>{this.props.item.title}</h2>
          </div>
        </Link>
      </article>
    )
  }
}

MovieListItem.propTypes = {
  item: PropTypes.object
}
