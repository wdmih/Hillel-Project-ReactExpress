import React, { Component } from 'react'

import PageTitle from './Page-Title'

export default class AdminPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageTitle: 'admin page'
    }
  }
  render () {
    return (
      <PageTitle pageTitle={this.state.pageTitle}/>
    )
  }
}
