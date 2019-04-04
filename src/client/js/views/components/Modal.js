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
      orderList: [],
      orderInProgress: false
    }
    this.setReserve = this.setReserve.bind(this)
    this.makeOrder = this.makeOrder.bind(this)
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
    this.setState({ session: {} })
  }

  setReserve (rowId, seatId) {
    let row = rowId - 1
    let seat = seatId - 1
    let session = this.state.session
    let sessionSchema = session.hall.schema
    if (!sessionSchema[row].seats[seat].sold) {
      sessionSchema[row].seats[seat].reserved = !sessionSchema[row].seats[seat].reserved
    }
    this.setState({ session: session })
    this.setOrderList()
  }

  setOrderList () {
    let schema = this.state.session.hall.schema
    let orderList = []
    schema.forEach(row => {
      let seats = row.seats.filter(seat => seat.reserved === true)
      if (seats.length !== 0) {
        seats.forEach(seat => {
          orderList.push({
            rowId: row.number,
            seatId: seat.number
          })
        })
      }
    })
    this.setState({ orderList: orderList })
  }

  setOrder () {
    let session = this.state.session
    session.hall.schema.forEach(row => {
      row.seats.forEach(seat => {
        if (seat.reserved === true) {
          seat.reserved = false
          seat.sold = true
        }
      })
    })
    return session
  }

  makeOrder () {
    let session = this.setOrder()
    this.setState({ orderInProgress: true })
    api.order.makeOrder(session.id, session.hall)
      .then((res) => {
        this.setState({
          orderList: []
        })
      })
  }

  render () {
    let { modalIsShow } = this.props.context.state
    let { closeModal } = this.props.context
    let { movie, session, orderList } = this.state
    return (
      <div id="modal-cart" className={`modal ${modalIsShow ? 'modal--active' : ''}`}>
        <div className="modal-content">
          <span className="close close--modal" onClick={closeModal}></span>
          <div className="modal-content__inner">
            <div className="modal-col">
              <ModalMovieSection movie={movie} session={session}/>
              <ModalOrder orderList={orderList} makeOrder={this.makeOrder}/>
            </div>
            <div className="modal-col">
              <ModalHallSchema session={session} setReserve={this.setReserve}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
