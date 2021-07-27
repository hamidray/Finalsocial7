<template>
  <div>
  <Nav />
  <div class="login-wrapper m-3">
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <div class="login-form-group">
          <h3>Login</h3>

          <label>Email</label>
          <input type="email" class="form-control" v-model="email" placeholder="Email" />
          <br>
          <label>Password</label>
          <input type="password" class="form-control" v-model="password" placeholder="Password" />

          <button class="btn btn-primary btn-block"
          @click="login">
          Login</button>
        </div> 
      </div>
    </div>
  </div>
  </div>
</template>


<script>
import AuthenticationService from '@/services/AuthenticationService'
import { mapMutations } from 'vuex'
import Nav from './Nav'
export default {
  ///name: 'Login',
  components: {
    Nav
  },
  data () {
    return {
      email: '',
      password: '',
      //error: null
    }
  },
  methods: {
    ...mapMutations(['updateAccessToken', 'updateUserData']),
    async login () {
     const response = await AuthenticationService.login({
        email: this.email,
        password: this.password
      });
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('userId', response.data.user.id)
      localStorage.setItem('userType', response.data.user.isAdmin)
      this.updateAccessToken(response.data.token)
      this.updateUserData(response.data.user)
      // this.$store.dispatch('setToken', response.data.token)
      // this.$store.dispatch('setUser', response.data.user)
       
      this.$router.push('/home')
        
    
    }
    
     
    }
    
  }


</script>
<style>
  .login-form-group {
      /* max-width: 480px; */
      background: #ffffff;
      border-radius: 15px;
      transition: all .3s;
      padding: 30px;
  }
</style>
