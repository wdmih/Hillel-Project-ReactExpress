import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

export default class ScheduleListItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    openModal: PropTypes.func,
    sessions: PropTypes.array
  }
  constructor (props) {
    super(props)
    this.state = {
      sessionsGroup: []
    }
  }
  componentDidMount () {
    this.setState({ sessionsGroup: this.getSessionsGroups(this.props.item.id) })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ sessionsGroup: this.getSessionsGroups(this.props.item.id) })
    }
  }

  getSessionsGroups (movieId) {
    let groups = this.props.sessions
      .filter(item => {
        return (item.movieId === Number(movieId))
      })
      .reduce((groups, item) => {
        const date = moment(item.sessionDate).format('LL').valueOf()
        if (!groups[date]) {
          groups[date] = []
        }
        groups[date].push(item)
        return groups
      }, {})

    return Object.keys(groups).map((date) => {
      return groups[date]
    })
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
                        <a className="session-time-item" href="#" onClick={() => this.props.openModal(item.id)}>
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
