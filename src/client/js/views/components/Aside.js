import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class Aside extends Component {
  static propTypes = {
    updateFilterDates: PropTypes.func
  }
  constructor (props) {
    super(props)
  }

  onChangeHandler (value) {
    this.props.updateFilterDates(this.filterDateHelper(value))
  }

  filterDateHelper (value) {
    if (value === 'today') {
      return {
        startDate: moment(),
        endDate: moment().endOf('day')
      }
    } else if (value === 'tomorrow') {
      return {
        startDate: moment().add(1, 'days').startOf('day'),
        endDate: moment().add(1, 'days').endOf('day')
      }
    } else if (value === 'week') {
      return {
        startDate: moment(),
        endDate: moment().endOf('isoweek')
      }
    } else if (value === 'month') {
      return {
        startDate: moment(),
        endDate: moment().endOf('month')
      }
    }
  }

  render () {
    return (
      <aside id="session-filter" className="session-filter">
        <div className="filters-block wrapper" id="date-filter">
          <p className="filters-block__title">filters:</p>
          <label className="radio">
            <input
              type="radio"
              name="date-filter"
              value="today"
              defaultChecked
              onChange={(e) => this.onChangeHandler(e.target.value)}
            />
            <div className="radio__text">today</div>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="date-filter"
              value="tomorrow"
              onChange={(e) => this.onChangeHandler(e.target.value)}
            />
            <div className="radio__text">tomorrow</div>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="date-filter"
              value="week"
              onChange={(e) => this.onChangeHandler(e.target.value)}
            />
            <div className="radio__text">this week</div>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="date-filter"
              value="month"
              onChange={(e) => this.onChangeHandler(e.target.value)}
            />
            <div className="radio__text">this month</div>
          </label>
        </div>
      </aside>
    )
  }
}
