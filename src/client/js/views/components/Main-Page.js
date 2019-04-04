import React, { Component, Fragment } from 'react'

import api from '../../api'

import PageTitle from './Page-Title'
import MovieListItem from './Movie-List-Item'

export default class MainPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageTitle: 'now playing',
      movies: []
    }
  }
  componentDidMount () {
    api.movies.getMovies()
      .then((movRes) => this.setState({ movies: movRes.data }))
  }
  render () {
    let { pageTitle, movies } = this.state
    return (
      <Fragment>
        <PageTitle pageTitle={pageTitle} />
        <div className="section-content movies-list">
          {movies.map(item => (
            <MovieListItem key={item.id} item={item}/>
          ))}
        </div>
      </Fragment>
    )
  }
}
