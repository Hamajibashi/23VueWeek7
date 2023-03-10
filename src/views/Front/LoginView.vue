<template>
    <teleport to="title"> | 後台登入</teleport>
    <div class="text-center mt-4">
      <div class="row justify-content-center">
        <h1 class="h2 mb-4 fw-bold">
          請先登入
        </h1>
        <div class="col-8">
          <form id="form" class="form-signin">
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="username" placeholder="name@example.com" required autofocus
                v-model="user.username">
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="password" placeholder="Password" required
                v-model="user.password">
              <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="button" @click="login">
              登入
            </button>
          </form>
        </div>
      </div>
      <p class="mt-5 mb-3 text-muted">
        &copy; 2021~∞ - 六角學院
      </p>
    </div>
  </template>

<script>
const baseUrl = import.meta.env.VITE_API
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const url = `${baseUrl}/v2/admin/signin`
      this.axios.post(url, this.user)
        .then(res => {
          const { token, expired } = res.data
          document.cookie = `hexschool=${token}; expires=${expired}`
          this.$router.push('/admin')
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  }
}
</script>

  <style>
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
  </style>
