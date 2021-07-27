import axios from 'axios'
import Config from './Config/config'
export default () => {
    return axios.create({
     baseURL: Config.apiUrl,
     headers: {
         "Content-type": "application/json",
         "token": localStorage.getItem("authToken")
          }
    })
}
     