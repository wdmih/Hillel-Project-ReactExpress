import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ModalOrder extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="order-container">
        <div className="order-item">
          <span className="order-item__row">Row:3</span>
          <span className="order-item__seat">Seat:4</span>
          <span className="close order-item--del"></span>
        </div>
        <button className="button">Book now</button>
      </div>
    )
  }
}
