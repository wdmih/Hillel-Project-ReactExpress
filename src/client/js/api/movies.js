import axios from 'axios'

export default {
  getMovies: () => {
    return axios.get('/api/movies')
  },
  getMovieById: (id) => {
    return axios.get(`/api/movies/${id}`)
  }
}
