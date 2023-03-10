<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/admin">後台</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link">產品管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders" class="nav-link">訂單管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupons" class="nav-link">優惠券管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/articles" class="nav-link">貼文管理</router-link>
          </li>
        </ul>
      </div>
      <a class="btn btn-danger" @click="logout">登出</a>
    </div>
  </nav>
</template>

<script>
const baseUrl = import.meta.env.VITE_API
export default {
  methods: {
    logout () {
      const url = `${baseUrl}/v2/logout`
      this.axios.post(url)
        .then(res => {
          this.$router.push('/login')
          alert(res.data.message)
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  }
}
</script>
