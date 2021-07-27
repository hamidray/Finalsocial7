<template>
    <div class="single-reply-inner-wrapper">
        <div class="user">
            <small><b>{{replyData.user.firstName}} {{replyData.user.lastName}}</b></small>
        </div>
        <div><small>{{replyData.reply}}</small></div>
    </div>
</template>
<script>
export default {
    name: 'single-reply',
    props: {
        replyData: {
            default: ''
        }
    },

    data () {
        return {
        }
    },
    methods: {
    }
}
</script>
<style>
    .single-reply-inner-wrapper {
        background: #f7f5f5;
        border-radius: 8px;
        padding-top: 3px;
        padding-left: 8px;
    }
</style>
