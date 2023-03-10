<template>
  <teleport to='title'> | 訂單管理</teleport>
  <h1 class="h2 fw-bold my-4">訂單管理</h1>
  <table class="table table-hover mt-4">
    <thead class="table-dark">
      <tr>
        <th width="120">
          購買時間
        </th>
        <th>Email</th>
        <th width="120">
          購買品項
        </th>
        <th width="120">
          應付金額
        </th>
        <th width="100">
          是否付款
        </th>
        <th width="120">
          編輯
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="order in orders" :key="order.id">
        <tr v-if="orders.length" :class="{ 'text-secondary': !order.is_paid }">
          <td>{{ $filters.date(order.create_at) }}</td>
          <td>{{ order.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in order.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>{{ order.total }}</td>
          <td>
            <span class="text-success" v-if="order.is_paid">已付款</span>
            <span v-else class="text-muted">未付款</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit', order)">
                檢視
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal"
                data-bs-target="#deleteModal" @click="openModal('delete', order)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <pagination-component @emit-pages="getOrders" :pages="pagination" />
  <div id="orderModal" ref="orderModal" class="modal fade" tabindex="-1" aria-labelledby="orderModalLabel"
    aria-hidden="true">
    <order-modal :temp-order="tempOrder" :update-order="updateOrder"></order-modal>
  </div>
  <div id="deleteModal" ref="deleteModal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel"
      aria-hidden="true">
      <delete-modal :item="tempOrder" @del-item="deleteOrder"></delete-modal>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import PaginationComponent from '../../components/PaginationComponent.vue'
import DeleteModal from '../../components/DeleteModal.vue'
import OrderModal from '../../components/OrderModal.vue'
import { mapActions, mapState } from 'pinia'
import ordersStore from '../../stores/ordersStore.js'

const baseUrl = import.meta.env.VITE_API
const apiPath = import.meta.env.VITE_APIPATH

export default {
  components: {
    PaginationComponent,
    DeleteModal,
    OrderModal
  },
  data () {
    return {
      tempOrder: {},
      deleteModal: null,
      orderModal: null
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
    updateOrder () {
      // 預設為新增產品
      let url = `${baseUrl}/v2/api/${apiPath}/admin/order`
      let httpMethod = 'post'

      // 當 isNew 為 false 時 = 編輯產品時
      if (!this.isNew) {
        url = `${baseUrl}/v2/api/${apiPath}/admin/order/${this.tempOrder.id}`
        httpMethod = 'put'
      }

      this.axios[httpMethod](url, { data: this.tempOrder })
        .then(res => {
          alert(res.data.message)
          this.orderModal.hide()
          this.getOrders()
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    deleteOrder (id) {
      const url = `${baseUrl}/v2/api/${apiPath}/admin/order/${id}`
      this.axios.delete(url)
        .then(res => {
          alert(res.data.message)
          this.deleteModal.hide()
          this.getOrders()
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    openModal (status, order) {
      if (status === 'delete') {
        this.tempOrder = { ...order }
        this.deleteModal.show()
      } else if (status === 'edit') {
        this.tempOrder = { ...order }
        this.orderModal.show()
      }
    },
    ...mapActions(ordersStore, ['getOrders'])
  },
  computed: {
    ...mapState(ordersStore, ['orders', 'pagination'])
  },
  mounted () {
    this.addLoading()
    this.getOrders()
    this.deleteModal = new Modal('#deleteModal')
    this.orderModal = new Modal('#orderModal')
  }
}
</script>
