<template>
    <NavbarComponent/>
    <div class="container">
        <router-view v-if="checkSuccess"/>
    </div>
</template>

<script>
import NavbarComponent from '../../components/NavbarComponent.vue'
const baseUrl = import.meta.env.VITE_API
export default {
  components: {
    NavbarComponent
  },
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    checkLogin () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschool\s*\=\s*([^;]*).*$)|^.*$/, '$1') // eslint-disable-line
      if (token) {
        this.axios.defaults.headers.common.Authorization = `${token}`
        const url = `${baseUrl}/v2/api/user/check`
        this.axios.post(url)
          .then(() => {
            this.checkSuccess = true
          })
          .catch(err => {
            alert(err.response.data.message)
            this.$router.push('/login')
          })
      } else {
        alert('請重新登入')
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    // 登入驗證
    this.checkLogin()
  }
}
</script>
