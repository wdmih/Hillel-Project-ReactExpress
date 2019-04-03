import axios from 'axios'

export default {
  getMoviesWithSessions: () => {
    return axios.get('/api/sessions/getSessionsMovies')
  },
  getSessions: () => {
    return axios.get('/api/sessions/getSessions')
  },
  getCurMovieSession: (id) => {
    return axios.get(`/api/sessions/getCurMovieSession/${id}`)
  }
}
