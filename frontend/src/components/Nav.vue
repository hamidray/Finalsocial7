<template>
    
    <nav class="navbar navbar-expand navbar-light">
      
          <div class="container">
         
          <img src="icon-left-font-monochrome-black.png" alt="9GAG" width="200" height="150">
                
         
          <div class="collapse navbar-collapse">
            
          <ul class="navbar-nav ml-auto">
               
            
                <router-link v-if="isLoggin" to="/home" class="nav-link">Home</router-link>
                        
                <router-link v-if="isLoggin && isAdmin==0" to="/posts" class="nav-link">ADD GIFs</router-link>
                <router-link v-if="isLoggin && isAdmin==1" to="/posts" class="nav-link">Read News</router-link>

            <li class="nav-item">
               <router-link v-if="!isLoggin" to="/login" class="nav-link">Login</router-link>
            </li>   

            <li class="nav-item">
               <router-link  v-if="!isLoggin" to="/register" class="nav-link">Sign Up</router-link>
            </li>

               
             <li class="nav-item">
               <a href="javascript:void(0)" @click="dologout()" v-if="isLoggin" class="nav-link" >LOGOUT</a>
             </li>
            
           </ul>   
         </div>   
       </div>
    </nav>

</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'Nav',
    data () {
      return {
        isLoggin: false,
        isAdmin: 0
      }
    },
    created () {
      if(localStorage.getItem('authToken')){
        this.isLoggin = true
        this.isAdmin = localStorage.getItem('userType')
      }
    },
    methods : {
      ...mapActions(['dologout'])
    }
  }
  
       
           
    

</script>

<style>

container{
  position: absolute;
}
</style>