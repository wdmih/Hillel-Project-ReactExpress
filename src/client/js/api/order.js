import axios from 'axios'

export default {
  makeOrder: (sesId, data) => {
    return axios.post(`/api/order/makeOrder/${sesId}`, {
      data: data
    })
  }
}
