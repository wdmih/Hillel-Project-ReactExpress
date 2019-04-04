import React, { Component, Fragment } from 'react'
import moment from 'moment'
import axios from 'axios'

import api from '../../api'

import PageTitle from '../components/Page-Title'
import Aside from '../components/Aside'
import ScheduleList from '../components/Schedule-List'
// import Modal from '../components/Modal'

export default class SchedulePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageTitle: 'Schedule',
      filterDates: {
        startDate: moment(),
        endDate: moment().endOf('day')
      },
      sessions: [],
      movies: [],
      actualSessions: [],
      actualMovies: []
    }
  }

  componentDidMount () {
    axios.all([api.sessions.getSessions(), api.sessions.getMoviesWithSessions()])
      .then(axios.spread((sesRes, movRes) => {
        this.setState({ sessions: sesRes.data, movies: movRes.data })
      }))
      .then(() => this.setActualMovieSessions(this.state.filterDates))
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.filterDates !== this.state.filterDates) {
      this.setActualMovieSessions(this.state.filterDates)
    }
  }

  setActualMovieSessions (dates) {
    let startDate = dates.startDate.valueOf()
    let endDate = dates.endDate.valueOf()

    let actualSessions = this.state.sessions.filter(item => {
      let sessionDate = moment(item.sessionDate).valueOf()
      return (startDate <= sessionDate && sessionDate <= endDate)
    })

    this.setState({ actualSessions: actualSessions })

    let uniqMovieId = [...new Set(actualSessions.map(item => item.movieId))]

    let actualMovies = []
    uniqMovieId.forEach(item => {
      actualMovies.push(this.state.movies.find(movie => movie.id === Number(item)))
    })

    this.setState({ actualMovies: actualMovies })
  }

  updateFilterDates = value => {
    this.setState({ filterDates: value })
  }

  render () {
    let { pageTitle, actualMovies, actualSessions } = this.state
    return (
      <Fragment>
        <PageTitle pageTitle={pageTitle} />
        <ScheduleList movies={actualMovies} sessions={actualSessions} />
        <Aside updateFilterDates={this.updateFilterDates} />
      </Fragment>
    )
  }
}
