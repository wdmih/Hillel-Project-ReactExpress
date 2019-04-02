import React, { Component, Fragment } from 'react'
import PageTitle from '../components/Page-Title'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class MovieDetailPage extends Component {
  static propTypes = {
    match: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      movie: {},
      sessions: []
    }
  }
  componentDidMount () {
    this.loadMovie()
      .then(movRes => {
        this.setState({ movie: movRes.data })
        this.loadSessions()
          .then(sesRes => this.setState({ sessions: sesRes.data }))
      })
  }
  loadMovie () {
    return axios.get(`/api/movies/${this.props.match.params.slug}`)
  }
  loadSessions () {
    return axios.get(`/api/sessions/getCurMovieSession/${this.state.movie.id}`)
  }
  render () {
    let { movie, sessions } = this.state
    return (
      <Fragment>
        <PageTitle pageTitle={movie.title} />
        <div className="section-content movie-page">
          <div className="movie-img-wrapper">
            <figure>
              <img
                src={movie.poster_path}
                alt={movie.title}
              />
            </figure>
          </div>
          <div className="movie-info">
            <ul>
              <li>
                <span className="info-title">Original Language:</span>
                <span className="info-title-value">
                  {movie.original_language}
                </span>
              </li>
              <li>
                <span className="info-title">Release date:</span>
                <span className="info-title-value">
                  {movie.release_date}
                </span>
              </li>
              <li>
                <span className="info-title">Overview:</span>
                <span className="info-title-value">
                  {movie.overview}
                </span>
              </li>
            </ul>
            {sessions.length > 0
              ? <div className="movie-sessions-time">
                <p>Sessions today:</p>
                <ul>
                  {sessions.map(item => (
                    <li key={item.id} className="session-time-tag">
                      <a href="#" data-sesid={item.id}>
                        {new Date(item.sessionDate).getHours()}:{new Date(item.sessionDate).getMinutes()}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              : <div className="movie-info-no-sessions"><span>No sessions today</span></div> }
          </div>
        </div>
      </Fragment>
    )
  }
}
