import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class RadioInput extends Component {
  static propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    defaultChecked: PropTypes.bool,
    onChangeHandler: PropTypes.func
  }
  constructor (props) {
    super(props)
  }
  render () {
    let { name, value, defaultChecked, onChangeHandler, title } = this.props
    return (
      <label className="radio">
        <input
          type="radio"
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          onChange={(e) => onChangeHandler(e.target.value)}
        />
        <div className="radio__text">{title}</div>
      </label>
    )
  }
}
