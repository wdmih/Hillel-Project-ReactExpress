import React, { Component, Fragment } from 'react'
import moment from 'moment'

import PageTitle from '../components/Page-Title'
import Aside from '../components/Aside'
import ScheduleListItem from '../components/Schedule-List-Item'

export default class SchedulePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageTitle: 'Schedule',
      filterDates: {
        startDate: moment().startOf('day').format('YYYY-MM-DDTHH:mm'),
        endDate: moment().endOf('day').format('YYYY-MM-DDTHH:mm')
      },
      movies: []
    }
  }
  componentDidMount () {
    fetch('api/sessions/getsessionsmovies', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ dates: this.state.filterDates })
    })
      .then(res => res.json())
      .then(movies => this.setState({ movies: movies }))
  }
  render () {
    let { pageTitle, movies } = this.state
    return (
      <Fragment>
        <PageTitle pageTitle={pageTitle}/>
        <div className="section-content schedule-page">
          {movies.length > 0 ? movies.map(item => (
            <ScheduleListItem key={item.id} item={item}/>
          )) : <div className="movie-info-no-sessions">
            <p>There are no sessions for the selected date, please select a different date range</p>
          </div>}

        </div>
        <Aside/>
      </Fragment>
    )
  }
}
