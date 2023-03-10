import { defineStore } from 'pinia'
import axios from 'axios'
const baseUrl = import.meta.env.VITE_API
const apiPath = import.meta.env.VITE_APIPATH

export default defineStore('ordersStore', {
  state: () => ({
    ordersData: [],
    page: {}
  }),
  actions: {
    getOrders (page = 1) {
      const url = `${baseUrl}/v2/api/${apiPath}/admin/orders?page=${page}`
      axios.get(url)
        .then(res => {
          this.ordersData = res.data.orders
          this.page = res.data.pagination
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  getters: {
    orders: ({ ordersData }) => {
      return ordersData
    },
    pagination: ({ page }) => {
      return page
    }
  }
})
