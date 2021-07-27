<template>
    <div class="comments-list">
        <div v-for="(comment, index) in comments" :key="comment.id" class="comments-list-inner-wrapper ml-3 mt-3">
            <single-comment 
                @initReply="readyToReply(index)" 
                :singleComment="comment"
            />
            <!-- <reply-list :replise="comment.replies"/> -->
            <div class="reply-input mt-2 ml-3" v-if="index == selectedCommentForReply">
                <div class="reply-list">
                    <div v-for="reply in replies" :key="reply.id" class="comments-list-inner-wrapper ml-3 mt-3">
                        <single-reply :reply-data="reply"/>
                    </div>
                </div>
                <input type="text" class="form-control" placeholder="Leave a reply" v-model="reply" @keypress.enter="addReply(comment.id)" />
            </div>
        </div>
    </div>
</template>
<script>
import SingleComment from './SingleComment'
import SingleReply from './SingleReply'
import CommentsService from '../../../services/CommentsService'
export default {
    name: 'comments-list',
    components: {
        SingleComment,
        SingleReply
    },

    props: {
        comments: {
            type: Array,
            default: function () {
                return ''
            }
        }
    },
    data () {
        return {
            showReplyField: '',
            selectedCommentForReply: -1,
            replies: [],
            reply: ''
        }
    },

    methods: {
        readyToReply (index) {
            this.selectedCommentForReply = index

            const commentsService = new CommentsService()
            const commentsResults = commentsService.getReplies(this.comments[index].id)

            commentsResults.then((response) => {
                this.replies = response.data
            }).catch((err) => {
                console.log(err)
            })
        },

        addReply (commentId) {
            const commentsService = new CommentsService()
            const commentsResults = commentsService.addReply(commentId, this.reply)

            commentsResults.then((response) => {
                this.replies.push(response.data)
                this.reply = ''
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>
<style>
    .reply-input input {
        border-top: none;
        border-right: none;
        border-left: none;
    }
</style>
