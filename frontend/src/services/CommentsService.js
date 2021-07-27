import Api from '@/services/Api'

export default class CommentsService {
    getComments (postId) {
        return new Promise((resolve, reject) => {
            Api().get('post/'+postId+'/comment/all').then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    addComment (postId, postComment) {
        return new Promise((resolve, reject) => {
            Api().post('post/'+postId+'/comment', {comment: postComment}).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    getReplies (commentId) {
        return new Promise((resolve, reject) => {
            Api().get('post/comment/'+commentId+'/reply/all').then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    addReply (commentId, commentReply) {
        return new Promise((resolve, reject) => {
            Api().post('post/comment/'+commentId+'/reply', {reply: commentReply}).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    }
}