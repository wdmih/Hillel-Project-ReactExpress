import React, { Component, Fragment } from 'react'
import axios from 'axios'

import PageTitle from '../components/Page-Title'
import MovieListItem from '../components/Movie-List-Item'

export default class MainPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageTitle: 'now playing',
      movies: []
    }
  }
  componentDidMount () {
    axios.get('/api/movies')
      .then((res) => this.setState({ movies: res.data }))
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
