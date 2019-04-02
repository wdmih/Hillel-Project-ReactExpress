import React, { Component, Fragment } from 'react'
import moment from 'moment'
import axios from 'axios'

import PageTitle from '../components/Page-Title'
import Aside from '../components/Aside'
import ScheduleList from '../components/Schedule-List'
import Modal from '../components/Modal'

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
      actualMovies: [],
      modalIsShow: false,
      sessionIdForModal: null
    }
  }

  componentDidMount () {
    axios.all([this.loadSessions(), this.loadMovies()])
      .then(axios.spread((sess, movs) => {
        this.setState({ sessions: sess.data, movies: movs.data })
      }))
      .then(() => this.setActualMovieSessions(this.state.filterDates))
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.filterDates !== this.state.filterDates) {
      this.setActualMovieSessions(this.state.filterDates)
    }
  }

  loadSessions () {
    return axios.get('/api//sessions/getSessions')
  }

  loadMovies () {
    return axios.get('/api/sessions/getSessionsMovies')
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

  // openModal = (sessionId) => {
  //   this.setState({
  //     modalIsShow: true,
  //     sessionIdForModal: sessionId
  //   })
  // }

  // closeModal = () => {
  //   this.setState({ modalIsShow: false })
  // }

  render () {
    let { pageTitle, actualMovies, actualSessions, modalIsShow, sessionIdForModal } = this.state
    return (
      <Fragment>
        <PageTitle pageTitle={pageTitle} />
        <ScheduleList movies={actualMovies} sessions={actualSessions} />
        <Aside updateFilterDates={this.updateFilterDates} />
        {/* {this.state.modalIsShow && <Modal isShow={modalIsShow} sessionId={sessionIdForModal} onCloseModal={this.closeModal}/>} */}
      </Fragment>
    )
  }
}
