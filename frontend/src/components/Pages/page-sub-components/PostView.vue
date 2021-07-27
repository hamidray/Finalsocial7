<template>
    <div class="post-view m-3">
        <div class="post-view-header">
            <div class="post-owner">
                <div class="row">
                    <div class="col-md-6">
                        <h5><i class="fa fa-user mr-2"></i>Published by: {{postDetails.user.firstName}} {{postDetails.user.lastName}}</h5>
                    </div>
                    <div class="col-md-6 text-right" v-if="userId == postDetails.user.id || isAdmin == 1" @click="deletePost()">
                        <p>Delete</p>
                    </div>
                </div>
            </div>
            <div class="post-title">
                <h4>{{postDetails.title}}</h4>
            </div>
            <hr>
            <div class="post-image">
                <img :src="postDetails.imageUrl" class="mx-auto d-block">
                <p v-if="!postDetails.imageUrl">No image to show</p>
            </div>
            <div class="post-actions-wrapper">
                <hr>
                <i class="fa fa-lg fa-thumbs-up mr-3" @click="toggleLikeDislike(true)"></i>
                <i class="fa fa-lg fa-thumbs-down" @click="toggleLikeDislike(false)"></i>
                <small class="ml-4"><b>Likes ({{likesCount}})</b></small>
                <small class="ml-4"><b>Dislikes ({{dislikeCount}})</b></small>
                <hr>
            </div>
            <small class="comments-text" @click="toggleComments()">Comments</small>
            <div class="comments-wrapper" v-if="showComments">
                <div class="comment-input">
                    <input type="text" class="form-control" placeholder="Leave a comment" v-model="comment" @keyup.enter="addComment()" />
                </div>
                <comments-list :comments="comments"/>
            </div>
        </div>
    </div>
</template>
<script>
import CommentsList from './CommentsList'
import CommentsService from '../../../services/CommentsService'
import PostService from '../../../services/PostService'
import Config from '../../../services/Config/config'
export default {
    name: 'post-view',
    components: {
        CommentsList
    },
    props: {
        postData: {
            default: function () {
                return ''
            }
        }
    },

    beforeMount () {
        this.postDetails = this.postData
        this.getReactions()
        this.apiUrl = Config.apiUrl
        this.isAdmin = localStorage.getItem('userType')
        this.userId = localStorage.getItem('userId')

    },

    data() {
        return{
            apiUrl: '',
            comment: '',
            comments : [],
            showComments: false,
            postDetails: this.postData,
            likesCount: 0,
            dislikeCount: 0,
            isAdmin:0,
            userId: ''
        }
    },

    methods: {
        toggleLikeDislike (status) {
            const postService = new PostService()
            const postResults = postService.toggleLikeDislike(this.postDetails.id, status)

            postResults.then(() => {
                this.getReactions()
            }).catch((err) => {
                console.log(err)
            })
        },

        deletePost() {
            const postService = new PostService()
            const postResults = postService.deletePost(this.postDetails.id)

            postResults.then(() => {
                this.$emit('deletePostSuccess')
            }).catch((err) => {
                console.log(err)
            })
        },
        toggleComments () {
            this.showComments = !this.showComments

            if (this.showComments) {
                const commentsService = new CommentsService()
                const commentsResults = commentsService.getComments(this.postDetails.id)

                commentsResults.then((response) => {
                    this.comments = response.data
                }).catch((err) => {
                    console.log(err)
                })
            }
        },

        addComment () {
            const commentsService = new CommentsService()
            const commentsResults = commentsService.addComment(this.postDetails.id, this.comment)

            commentsResults.then((response) => {
                this.comments.unshift(response.data)
                this.comment = ''
            }).catch((err) => {
                console.log(err)
            })
        },

        getReactions () {
            const postService = new PostService()
            const postResults = postService.getReactions(this.postDetails.id)

            postResults.then((response) => {
                this.likesCount = response.data.likes
                this.dislikeCount = response.data.unLikes
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>
<style>
    .post-view {
        /* max-width: 480px; */
        background: #ffffff;
        border-radius: 15px;
        transition: all .3s;
        padding: 30px;
    }

    .post-image {
        max-height: 400px;
        overflow: hidden;
        overflow-y: scroll
    }

    .comments-text {
        cursor: pointer;
    }
    
</style>
