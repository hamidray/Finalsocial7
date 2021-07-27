import Api from '@/services/Api'

export default class PostService {
    addPosts(request) {
        return new Promise((resolve, reject) => {
            Api().post('post', request).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    getPosts () {
        return new Promise((resolve, reject) => {
            Api().get('post').then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    toggleLikeDislike (postId, status) {
        return new Promise((resolve, reject) => {
            Api().post('post/'+postId+'/reaction', {like: status}).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    getReactions (postId) {
        return new Promise((resolve, reject) => {
            Api().get('post/'+postId+'/reaction/all').then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    getUser (userId) {
        return new Promise((resolve, reject) => {
            Api().get('user/'+userId).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    deletePost (postId) {
        return new Promise((resolve, reject) => {
            Api().delete('post/'+postId).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    }
}