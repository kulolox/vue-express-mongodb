<template>
  <div class="hello">
    <input class="form-control" id="inputEmail3" placeholder="请输入账号" v-model="account">
    <input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码" v-model="password">
    <button type="submit" class="btn btn-default" @click="login">登录</button>
    <button type="submit" class="btn btn-default" @click="regist">注册</button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login() {
      const params = {
        account: this.account,
        password: this.password
      }
      this.$http.post(`/api/login/getAccount?account`, params)
      .then(res => {
        console.log(res);
        // if (res[0].account === this.account) {
        //   alert('登录成功')
        // } else {
        //   alert('查无此人')
        // }
      })
      .catch(reject => {
        console.error(reject)
      })
    },
    regist() {
      const params = {
        account: this.account,
        password: this.password
      }
      this.$http.post('/api/login/createAccount', params)
      .then(res => {
        console.log(res);
      })
      .catch(reject => {
        console.error(reject)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  display: block;
  margin: 20px 0;
}
</style>
