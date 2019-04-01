import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ModalMovieSection from '../components/ModalMovieSection'
import ModalOrder from '../components/ModalOrder'
import ModalHallSchema from '../components/ModalHallSchema'

export default class Modal extends Component {
  static propTypes = {
    isShow: PropTypes.bool,
    onCloseModal: PropTypes.func,
    sessionId: PropTypes.number
  }
  constructor (props) {
    super(props)
    this.state = {
      session: {},
      movie: {},
      orderList: []
    }
  }
  componentDidMount () {
    fetch(`/api/sessions/getbyid/${this.props.sessionId}`)
      .then(res => res.json())
      .then(session => {
        this.setState({ session: session })
        return fetch(`/api//movies/${this.state.session.movieId}`)
          .then(res => res.json())
          .then(movie => this.setState({ movie: movie }))
      })
  }
  componentWillUnmount () {
    this.setState({ orderList: [] })
  }
  render () {
    let { isShow, onCloseModal } = this.props
    let { movie, session } = this.state
    return (
      <div id="modal-cart" className={`modal ${isShow ? 'modal--active' : ''}`}>
        <div className="modal-content">
          <span className="close close--modal" onClick={onCloseModal}></span>
          <div className="modal-content__inner">
            <div className="modal-col">
              <ModalMovieSection movie={movie} session={session}/>
              <ModalOrder/>
            </div>
            <div className="modal-col">
              <ModalHallSchema session={session}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
