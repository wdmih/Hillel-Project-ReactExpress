import React, { Component, Fragment } from 'react'

import PageTitle from '../components/Page-Title'
import MovieListItem from '../components/Movie-List-Item'

export default class MainPage extends Component {
  state = {
    pageTitle: 'now playing',
    movies: []
  }
  componentDidMount () {
    fetch('/api/movies')
      .then(res => res.json())
      .then(movies => this.setState({ movies: movies }))
  }
  render () {
    return (
      <Fragment>
        <PageTitle pageTitle={this.state.pageTitle} />
        <div className="section-content movies-list">
          {this.state.movies.map(item => (
            <MovieListItem key={item.id} item={item}/>
          ))}
        </div>
      </Fragment>
    )
  }
}
