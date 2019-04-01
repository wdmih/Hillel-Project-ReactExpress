import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ScheduleListItem from '../components/Schedule-List-Item'

export default class ScheduleList extends Component {
  static propTypes = {
    movies: PropTypes.array,
    openModal: PropTypes.func
  }
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="section-content schedule-page">
        {this.props.movies.length > 0 ? (
          this.props.movies.map(item => (
            <ScheduleListItem key={item.id} item={item} openModal={this.props.openModal} />
          ))
        ) : (
          <div className="movie-info-no-sessions">
            <p>
              There are no sessions for the selected date, please select a
              different date range
            </p>
          </div>
        )}
      </div>
    )
  }
}
