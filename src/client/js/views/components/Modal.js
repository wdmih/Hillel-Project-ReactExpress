import React, { Component } from 'react'
import PropTypes from 'prop-types'

import api from '../../api'

import ModalMovieSection from '../components/ModalMovieSection'
import ModalOrder from '../components/ModalOrder'
import ModalHallSchema from '../components/ModalHallSchema'

export default class Modal extends Component {
  static propTypes = {
    context: PropTypes.any
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
    api.sessions.getSessionById(this.props.context.state.sessionIdForModal)
      .then(sesRes => {
        this.setState({ session: sesRes.data })
        api.movies.getMovieById(this.state.session.movieId)
          .then(movRes => this.setState({ movie: movRes.data }))
      })
  }

  componentWillUnmount () {
    this.setState({ orderList: [] })
  }
  render () {
    let { modalIsShow } = this.props.context.state
    let { closeModal } = this.props.context
    let { movie, session } = this.state
    return (
      <div id="modal-cart" className={`modal ${modalIsShow ? 'modal--active' : ''}`}>
        <div className="modal-content">
          <span className="close close--modal" onClick={closeModal}></span>
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
