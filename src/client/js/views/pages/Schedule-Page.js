import React, { Component, Fragment } from 'react'
import moment from 'moment'

import PageTitle from '../components/Page-Title'
import Aside from '../components/Aside'
import ScheduleList from '../components/Schedule-List'
import Modal from '../components/Modal'

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
      movies: [],
      modalIsShow: false,
      sessionIdForModal: null
    }
  }
  componentDidMount () {
    this._isMounted = true
    this._isMounted && this.loadSessions()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.filterDates !== this.state.filterDates) {
      this.loadSessions()
    }
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

  openModal = (sessionId) => {
    this.setState({
      modalIsShow: true,
      sessionIdForModal: sessionId
    })
  }

  closeModal = () => {
    this.setState({ modalIsShow: false })
  }

  render () {
    let { pageTitle, movies, modalIsShow, sessionIdForModal } = this.state
    return (
      <Fragment>
        <PageTitle pageTitle={pageTitle} />
        <ScheduleList movies={movies} openModal={this.openModal} />
        <Aside updateFilterDates={this.updateFilterDates} />
        {this.state.modalIsShow && <Modal isShow={modalIsShow} sessionId={sessionIdForModal} onCloseModal={this.closeModal}/>}
      </Fragment>
    )
  }
}
