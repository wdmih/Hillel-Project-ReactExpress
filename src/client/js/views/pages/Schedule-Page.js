import React, { Component, Fragment } from 'react'
import moment from 'moment'

import PageTitle from '../components/Page-Title'
import Aside from '../components/Aside'
import ScheduleList from '../components/Schedule-List'

export default class SchedulePage extends Component {
  constructor (props) {
    super(props)
    this._isMounted = false
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
    this._isMounted = true
    this._isMounted && this.loadSessions()
  }

  componentWillUnmount () {
    this._isMounted = false
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
      .then(movies => this._isMounted && this.setState({ movies: movies }))
  }

  updateFilterDates = value => {
    this.setState({ filterDates: value })
  }

  componentDidUpdate () {
    this.loadSessions()
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
