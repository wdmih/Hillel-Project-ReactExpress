import React, { Component } from 'react'
import PageTitle from '../components/Page-Title'

export default class SchedulePage extends Component {
  state = {
    pageTitle: 'Schedule'
  }
  render () {
    return (
      <PageTitle pageTitle={this.state.pageTitle}/>
    )
  }
}
