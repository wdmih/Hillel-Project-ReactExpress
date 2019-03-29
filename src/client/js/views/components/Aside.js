import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class Aside extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedFilter: 'today',
      filterDates: {
        startDate: moment().format('YYYY-MM-DDTHH:mm'),
        endDate: moment().endOf('day').format('YYYY-MM-DDTHH:mm')
      }
    }
  }
  // componentDidUpdate () {
  //   this.props.updateFilterDates(this.filterDateHelper(this.state.selectedFilter))
  // }

  componentDidMount () {
    this.props.updateFilterDates(this.state.filterDates)
  }

  onClickHandler (value) {
    this.setState({ selectedFilter: value })
    this.filterDateHelper(this.state.selectedFilter)
    this.props.updateFilterDates(this.state.filterDates)
  }

  filterDateHelper (value) {
    if (value === 'today') {
      this.setState({ filterDates: {
        startDate: moment().format('YYYY-MM-DDTHH:mm'),
        endDate: moment().endOf('day').format('YYYY-MM-DDTHH:mm')
      } })
    } else if (value === 'tomorrow') {
      this.setState({ filterDates: {
        startDate: moment().add(1, 'days').startOf('day').format('YYYY-MM-DDTHH:mm'),
        endDate: moment().add(1, 'days').endOf('day').format('YYYY-MM-DDTHH:mm')
      } })
    } else if (value === 'week') {
      this.setState({ filterDates: {
        startDate: moment().format('YYYY-MM-DDTHH:mm'),
        endDate: moment().endOf('isoweek').format('YYYY-MM-DDTHH:mm')
      } })
    } else if (value === 'month') {
      this.setState({ filterDates: {
        startDate: moment().format('YYYY-MM-DDTHH:mm'),
        endDate: moment().endOf('month').format('YYYY-MM-DDTHH:mm')
      } })
    } else {
      return null
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
              onClick={(e) => this.onClickHandler(e.target.value)}
            />
            <div className="radio__text">today</div>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="date-filter"
              value="tomorrow"
              onClick={(e) => this.onClickHandler(e.target.value)}
            />
            <div className="radio__text">tomorrow</div>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="date-filter"
              value="week"
              onClick={(e) => this.onClickHandler(e.target.value)}
            />
            <div className="radio__text">this week</div>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="date-filter"
              value="month"
              onClick={(e) => this.onClickHandler(e.target.value)}
            />
            <div className="radio__text">this month</div>
          </label>
        </div>
      </aside>
    )
  }
}

Aside.propTypes = {
  updateFilterDates: PropTypes.func
}
