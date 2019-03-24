import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PageTitle extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="section-title">
        <h1 id="page-title">{this.props.pageTitle}</h1>
        <span id="title-backdrop" className="backdrop">
          {this.props.pageTitle}
        </span>
      </div>
    )
  }
}

PageTitle.propTypes = {
  pageTitle: PropTypes.string,
}
