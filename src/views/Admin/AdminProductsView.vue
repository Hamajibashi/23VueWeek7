<template>
  <teleport to='title'> | 產品管理</teleport>
  <h1 class="h2 fw-bold my-4">產品管理</h1>
  <div class="text-end mt-4">
    <button type="button" class="btn btn-primary" @click="openModal('new')">
      建立新的產品
    </button>
  </div>
  <table class="table table-hover mt-4">
    <thead class="table-dark">
      <tr>
        <th width="120">
          分類
        </th>
        <th>產品名稱</th>
        <th width="120">
          原價
        </th>
        <th width="120">
          售價
        </th>
        <th width="100">
          是否啟用
        </th>
        <th width="120">
          編輯
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id" :class="{'text-secondary': !product.is_enabled}">
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td>{{ product.origin_price }}</td>
        <td>{{ product.price }}</td>
        <td>
          <span class="text-success" v-if="product.is_enabled">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit', product)">
              編輯
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal"
              data-bs-target="#deleteModal" @click="openModal('delete', product)">
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <pagination-component @emit-pages="getProducts" :pages="pagination" />
  <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <product-modal :is-new="isNew" :temp-product="tempProduct" :update-product="updateProduct"></product-modal>
  </div>
  <div id="deleteModal" ref="deleteModal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel"
    aria-hidden="true">
    <delete-modal :item="tempProduct" @del-item="deleteProduct"></delete-modal>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import PaginationComponent from '../../components/PaginationComponent.vue'
import DeleteModal from '../../components/DeleteModal.vue'
import ProductModal from '../../components/ProductModal.vue'
import { mapActions, mapState } from 'pinia'
import productStore from '../../stores/productStore.js'

const baseUrl = import.meta.env.VITE_API
const apiPath = import.meta.env.VITE_APIPATH

export default {
  components: {
    PaginationComponent,
    DeleteModal,
    ProductModal
  },
  data () {
    return {
      tempProduct: {
        imagesUrl: []
      },
      isNew: true,
      deleteModal: null,
      productModal: null
    }
  },
  methods: {
    // loading 效果
    addLoading () {
      const loader = this.$loading.show()
      setTimeout(() => {
        loader.hide()
      }, 800)
    },
    updateProduct () {
      // 預設為新增產品
      let url = `${baseUrl}/v2/api/${apiPath}/admin/product`
      let httpMethod = 'post'

      // 當 isNew 為 false 時 = 編輯產品時
      if (!this.isNew) {
        url = `${baseUrl}/v2/api/${apiPath}/admin/product/${this.tempProduct.id}`
        httpMethod = 'put'
      }

      this.axios[httpMethod](url, { data: this.tempProduct })
        .then(res => {
          alert(res.data.message)
          this.productModal.hide()
          this.getProducts()
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    deleteProduct () {
      const url = `${baseUrl}/v2/api/${apiPath}/admin/product/${this.tempProduct.id}`
      this.axios.delete(url)
        .then(res => {
          alert(res.data.message)
          this.deleteModal.hide()
          this.getProducts()
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    openModal (status, product) {
      if (status === 'delete') {
        this.tempProduct = { ...product }
        this.deleteModal.show()
      } else if (status === 'edit') {
        this.isNew = false
        this.tempProduct = { ...product }
        this.productModal.show()
      } else if (status === 'new') {
        this.isNew = true
        this.tempProduct = { imagesUrl: [] }
        this.productModal.show()
      }
    },
    ...mapActions(productStore, ['getProducts'])
  },
  computed: {
    ...mapState(productStore, ['products', 'pagination'])
  },
  mounted () {
    this.addLoading()
    this.getProducts()
    this.deleteModal = new Modal('#deleteModal')
    this.productModal = new Modal('#productModal')
  }
}
</script>
