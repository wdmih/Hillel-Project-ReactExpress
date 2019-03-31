import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ModalMovieSection extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    let { movie, session } = this.props
    return (
      <div className="modal-movie movie-session">
        <figure className="movie-session__img" style={{ backgroundImage: `url(${movie.poster_path})` }}>
        </figure>
        <div className="movie-session__info">
          <h3>{movie ? movie.title : ''}</h3>
          <span>{new Date(session.sessionDate).getDate()}.{new Date(session.sessionDate).getMonth() + 1}.{new Date(session.sessionDate).getFullYear()}</span>
          <span>Session:{new Date(session.sessionDate).getHours()}:{new Date(session.sessionDate).getMinutes()}</span>
        </div>
      </div>
    )
  }
}
ModalMovieSection.propTypes = {
  movie: PropTypes.object,
  session: PropTypes.object
}
