<template>
  <div class="hello">
    <Nav />
    <div class="row">
      <div class="col-md-12 text-center">
        <h1 v-if="isLoggin"> "HOME PAGE" <br> Hi {{userData.firstName}} {{userData.lastName}} Welcome to <br> Groupomania Social Network </h1>
        <h5 v-if="userData.isAdmin === 0">Role Type: User</h5>
        <h5 v-if="userData.isAdmin === 1">Role Type: Admin</h5>
        <p>
          Please click your GIFs
          <router-link v-if="userData.isAdmin === 1" to="/posts" class="nav-link">Read News</router-link>
          <!-- <a href="https://cli.vuejs.org" target="_blank" rel="noopener"> maintance</a>. -->
        </p>
      </div>
    </div>
    
  
  </div>
</template>

<script>
import Nav from './Nav'
import PostService from '../services/PostService'
export default {
  name: 'Home',
  components: {
    Nav
  },
  data () {
    return{
      isLoggin: false,
      userData: {}
    }
  },
  created () {
    if(!localStorage.getItem('authToken')){
      this.$router.push('/login')
    }else{
      this.isLoggin = true

      const authService = new PostService()
      const userDetails = authService.getUser(localStorage.getItem('userId'))

      userDetails.then((response) => {
          this.userData = response.data
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>