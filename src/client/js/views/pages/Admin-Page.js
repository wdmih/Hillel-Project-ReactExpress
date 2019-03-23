import React, { Component } from 'react'

import PageTitle from '../components/Page-Title'

export default class AdminPage extends Component {
  state = {
    pageTitle: 'admin page'
  }
  render () {
    return (
      <PageTitle pageTitle={this.state.pageTitle}/>
    )
  }
}
