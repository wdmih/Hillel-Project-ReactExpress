import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import RadioInput from '../components/Radio-Input'

export default class Aside extends Component {
  static propTypes = {
    updateFilterDates: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      dateFilterVal: [
        {
          name: 'date-filter',
          title: 'today',
          value: 'today',
          defaultChecked: true
        },
        {
          name: 'date-filter',
          title: 'tomorrow',
          value: 'tomorrow',
          defaultChecked: false
        },
        {
          name: 'date-filter',
          title: 'this week',
          value: 'week',
          defaultChecked: false
        },
        {
          name: 'date-filter',
          title: 'this month',
          value: 'month',
          defaultChecked: false
        },
      ]
    }
    this.onChangeHandler = this.onChangeHandler.bind(this)
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
          {this.state.dateFilterVal.map((item, index) => (
            <RadioInput
              key={index}
              title={item.title}
              name={item.name}
              value={item.value}
              defaultChecked={item.defaultChecked}
              onChangeHandler={this.onChangeHandler}
            />
          ))}
        </div>
      </aside>
    )
  }
}
