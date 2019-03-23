import React, { Component } from 'react'

export default class Aside extends Component {
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
            />
            <div className="radio__text">today</div>
          </label>
          <label className="radio">
            <input type="radio" name="date-filter" value="tomorrow" />
            <div className="radio__text">tomorrow</div>
          </label>
          <label className="radio">
            <input type="radio" name="date-filter" value="week" />
            <div className="radio__text">this week</div>
          </label>
          <label className="radio">
            <input type="radio" name="date-filter" value="month" />
            <div className="radio__text">this month</div>
          </label>
        </div>
      </aside>
    )
  }
}
