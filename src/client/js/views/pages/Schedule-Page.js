import React, { Component, Fragment } from 'react'
import moment from 'moment'

import PageTitle from '../components/Page-Title'
import Aside from '../components/Aside'
import ScheduleList from '../components/Schedule-List'

export default class SchedulePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageTitle: 'Schedule',
      filterDates: {
        startDate: moment().format('YYYY-MM-DDTHH:mm'),
        endDate: moment().endOf('day').format('YYYY-MM-DDTHH:mm')
      },
      movies: []
    }
  }
  componentDidMount () {
    this.loadSessions()
  }

  componentDidUpdate () {
    this.loadSessions()
  }

  loadSessions () {
    fetch('/api/sessions/getsessionsmovies', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ dates: this.state.filterDates })
    })
      .then(res => res.json())
      .then(movies => this.setState({ movies: movies }))
  }

  updateFilterDates = value => {
    this.setState({ filterDates: value })
  }

  render () {
    let { pageTitle, movies } = this.state
    return (
      <Fragment>
        <PageTitle pageTitle={pageTitle} />
        <ScheduleList movies={movies} />
        <Aside updateFilterDates={this.updateFilterDates} />
      </Fragment>
    )
  }
}
