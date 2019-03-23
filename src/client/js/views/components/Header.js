import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render () {
    return (
      <header className="header">
        <nav className="main-menu" id="main-menu">
          <ul>
            <li className="main-menu__item">
              <Link to="/">Now playing</Link>
            </li>
            <li className="main-menu__item">
              <Link to="/schedule">schedule</Link>
            </li>
          </ul>
          <div className="bottom__item">
            <Link className="main-menu__item" to="/admin-panel">
              admin panel
            </Link>
          </div>
        </nav>
      </header>
    )
  }
}
