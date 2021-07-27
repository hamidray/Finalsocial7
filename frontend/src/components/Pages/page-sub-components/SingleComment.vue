<template>
    <div class="single-comment-wrapper">
        <div class="single-comment-inner-wrapper">
            <div class="user">
                <small><b>{{singleComment.user.firstName}} {{singleComment.user.lastName}}</b></small>
            </div>
            <div><small>{{singleComment.comment}}</small></div>
            <div class="reply-link" @click="initReply()"><small>Reply</small></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'single-comment',
    props: {
        singleComment: {
            default: function () {
                return ''
            }
        }
    },
    methods: {
        initReply () {
            this.$emit('initReply')
        }
    }
}
</script>
<style>
    .single-comment-inner-wrapper {
        background: #f7f5f5;
        border-radius: 8px;
        padding-top: 3px;
        padding-left: 8px;
    }

    .reply-link {
        color: #c6c2ff;
        cursor: pointer;
        width:10px;
    }
</style>
