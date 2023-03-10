import { defineStore } from 'pinia'
import axios from 'axios'
const baseUrl = import.meta.env.VITE_API
const apiPath = import.meta.env.VITE_APIPATH

export default defineStore('productStore', {
  state: () => ({
    productsData: [],
    page: {}
  }),
  actions: {
    getProducts (page = 1) {
      const url = `${baseUrl}/v2/api/${apiPath}/admin/products?page=${page}`
      axios.get(url)
        .then(res => {
          this.productsData = res.data.products
          this.page = res.data.pagination
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  getters: {
    products: ({ productsData }) => {
      return productsData
    },
    pagination: ({ page }) => {
      return page
    }
  }
})
