<template>
  <div>
    <Nav />
  <div class="register-wrapper m-3">
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <div class="register-form-group">
        <h3>Sign Up</h3>
        <label>First Name</label>
        <input type="text" class="form-control" v-model="firstName" placeholder="Email" />
        <br>
        <label>Last Name</label>
        <input type="text" class="form-control" v-model="lastName" placeholder="Email" />
        <br>
        <label>Email Address</label>
        <input type="email" class="form-control" v-model="email" placeholder="Email" />
        <br>
        <label>Create Password</label>
        <input type="password" class="form-control" v-model="password" placeholder="Password" />

        <button @click="register" class="btn btn-primary btn-block">
        Register</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>


<script>
import AuthenticationService from '@/services/AuthenticationService'
import Nav from './Nav'
export default {
  ///name: 'Register',
  components: {
    Nav
  },
    data () {
    return {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
      }
    },
    methods: {
      async  register () {
       const response = await AuthenticationService.register({
            email : this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password
          })

         this.$router.push('/login')
           this.$store.dispatch('setToken', response.data.token)
           this.$store.dispatch('setUser', response.data.user)
       },
       
        
   }
   
 }
 
</script>
<style>
  .register-form-group {
      /* max-width: 480px; */
      background: #ffffff;
      border-radius: 15px;
      transition: all .3s;
      padding: 30px;
  }
</style>