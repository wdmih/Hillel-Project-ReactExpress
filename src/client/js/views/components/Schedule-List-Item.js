import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ScheduleListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sessionsGroup: []
    }
  }
  componentDidMount () {
    fetch(`/api/sessions/getsessionsgroups/${this.props.item.id}`)
      .then(res => res.json())
      .then(sessions => this.setState({ sessionsGroup: sessions }))
  }
  render () {
    let { poster_path, title } = this.props.item
    let { sessionsGroup } = this.state
    return (
      <article className="session-list__item">
        <div className="movie-session">
          <figure className="movie-session__img" style={{ backgroundImage: `url(${poster_path})` }}>
          </figure>
          <div className="movie-session__info">
            <h3>{title}</h3>
            {sessionsGroup.map((group, index) => (
              <div key={index} className="movie-session__wrap">
                <span>{new Date(group[0].sessionDate).getDate()}.{new Date(group[0].sessionDate).getMonth() + 1}.{new Date(group[0].sessionDate).getFullYear()}</span>
                <div className="movie-sessions-time">
                  <p>Sessions:</p>
                  <ul>
                    {group.map((item, index) => (
                      <li key={index} className="session-time-tag">
                        <a className="session-time-item" href="#" data-sesid={item.id}>
                          {new Date(item.sessionDate).getHours()}:{new Date(item.sessionDate).getMinutes()}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    )
  }
}
ScheduleListItem.propTypes = {
  item: PropTypes.object,
}
