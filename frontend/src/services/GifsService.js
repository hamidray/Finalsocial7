import Api from '@/services/Api'

export default {
         post (gags) {
         return Api().post('addgifs', gags)
     }
}    
