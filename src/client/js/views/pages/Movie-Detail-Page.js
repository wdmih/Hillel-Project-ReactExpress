import React, { Component, Fragment } from 'react'
import PageTitle from '../components/Page-Title'
import PropTypes from 'prop-types'

export default class MovieDetailPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movie: {}
    }
  }

  componentDidMount () {
    fetch(`/api/movies/${this.props.match.params.slug}`)
      .then(res => res.json())
      .then(movie => this.setState({ movie: movie }))
  }
  render () {
    return (
      <Fragment>
        <PageTitle pageTitle={this.state.movie.title} />
        <div className="section-content movie-page">
          <div className="movie-img-wrapper">
            <figure>
              <img
                src={this.state.movie.poster_path}
                alt={this.state.movie.title}
              />
            </figure>
          </div>
          <div className="movie-info">
            <ul>
              <li>
                <span className="info-title">Original Language:</span>
                <span className="info-title-value">{this.state.movie.original_language}</span>
              </li>
              <li>
                <span className="info-title">Release date:</span>
                <span className="info-title-value">{this.state.movie.release_date}</span>
              </li>
              <li>
                <span className="info-title">Overview:</span>
                <span className="info-title-value">{this.state.movie.overview}</span>
              </li>
            </ul>
          </div>
        </div>
      </Fragment>
    )
  }
}

MovieDetailPage.propTypes = {
  match: PropTypes.object
}
