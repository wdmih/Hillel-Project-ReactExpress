import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ModalOrder extends Component {
  static propTypes = {
    orderList: PropTypes.array,
    makeOrder: PropTypes.func
  }
  constructor (props) {
    super(props)
  }
  render () {
    let { orderList, makeOrder } = this.props
    return (
      <div className="order-container">
        {orderList.map((item, index) => (
          <div key={index} className="order-item">
            <span className="order-item__row">Row: {Number(item.rowId)}</span>
            <span className="order-item__seat">Seat: {Number(item.seatId)}</span>
          </div>
        ))}
        <button
          id="button-buy"
          className={`button ${orderList.length === 0 ? 'button-disabled' : ''}`}
          onClick={() => makeOrder()}>
            Book now
        </button>
      </div>
    )
  }
}
