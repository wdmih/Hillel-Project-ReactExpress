import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import screenImg from './../../../assets/img/screen.svg'

export default class ModalHallSchema extends Component {
  static propTypes = {
    session: PropTypes.object,
    setReserve: PropTypes.func
  }
  constructor (props) {
    super(props)
  }
  render () {
    let { session, setReserve } = this.props
    return (
      <Fragment>
        <div className="screen-container">
          <img className="screen-img" src={screenImg}></img>
          <span>screen</span>
        </div>
        <div className="seats-schema">
          {session.hall ? (
            session.hall.schema.map((row, i) => (
              <div className="seat-row" key={i}>
                {row.seats.map((seat, i) => (
                  <button key={i} className={`seat ${seat.sold ? 'disabled' : ''} ${seat.reserved ? 'checked' : ''}`} onClick={(e) => setReserve(row.number, seat.number)}></button>
                ))}
              </div>
            ))
          ) : ''}
        </div>
      </Fragment>
    )
  }
}
