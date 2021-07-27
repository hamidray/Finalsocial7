<template>
<div>
<Nav />
<div class="row">
  <div class="col-md-6 offset-md-3">
    <div class="post-page m-3">
      <form @submit.prevent="sendFile" enctype="multipart/form-data">
        <div v-if="message"
        :class="`message ${error ? 'is-danger' : 'is-success'}`"
        >
        <div class="message-body">{{message}}</div>
        </div>
        <div class="field">
          <div class="form-group">
          <label for="title">Title</label>
            <input type="text" class="form-control" placeholder="Add post title" v-model="title" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Comment</label>
              <textarea class="form-control" id="comment" v-model="description" rows="3" placeholder="Write a comment"></textarea>
            <br>
          </div>
          <label for="image">Add Gifs</label>
              <div class="file is-boxed is-primary">
                <label class="file-label">
              <input
                  type="file"
                  ref="file"
                  @change="selectFile"
                  class="file-input"
                />
                <div class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose A File
                  </span>
                  </div>
                  <span v-if="file" class="file-name">{{file.name}}</span>
            </label>
                </div>      
          </div>  
          <div class="field">   
            <button class="button btn-info">Send</button>
          </div>
      </form>
    </div>
  </div>
</div>
  <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="post-list-main-wrapper" v-for="post in posts" :key="post.id">
          <post-view :postData="post" @deletePostSuccess="getPosts()"/>
        </div>
      </div>
    </div>
</div>

</template>

<script>   
import PostView from './page-sub-components/PostView'
import PostService from '../../services/PostService'
import axios from 'axios'
import Nav from '../Nav'
export default {
 
  name: 'posts',
  components: {
    PostView,
    Nav
  },
    data() {
    return {
     file: "",
     description: "",
     message: "",
     error: false,
     title: '',
     posts: []
    }
  },
  created () {
    if(!localStorage.getItem('authToken')){
      this.$router.push('/login')
    }
  },
  beforeMount () {
   this.getPosts() 
  },
  methods: {
    selectFile() {
      this.file =this.$refs.file.files[0];
      //this.file = this.file;
       this.error = false;
       this.message = "";
    },
      
    sendFile() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('image', this.file);
      formData.append('description', this.description); 
      
      // const postService = new PostService()
      // const postResults = postService.addPosts(formData)
      try{
          let config = {
            headers: {
              token: localStorage.getItem("authToken"),
            }
          }
          axios.post('http://localhost:5555/api/post', formData, config).then(response => {
            console.log(response)
            this.message = "File has been uploaded"
            this.file = ""
            this.comment = ""
            this.error = false
            location.reload()  
          }).catch(err=>{
            console.log(err)
            this.message = "All feilds are required"
            this.error = true;
          })
                  
      } catch(err) {
        this.message = err.response.data.error;
        this.error = true;
      }
        
    },

    getPosts() {
        const postService = new PostService()
        const postResults = postService.getPosts()

        postResults.then((response) => {
          this.posts = response.data
        }).catch((err) => {
          console.log(err)
        })
    },
  }  
}
</script>
<style>
  .post-page {
    /* max-width: 480px; */
    background: #ffffff;
     border-radius: 15px;
     transition: all .3s;
     padding: 30px;
  }
</style>
