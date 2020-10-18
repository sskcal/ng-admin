import axios from 'axios'

const myAxios = axios.create({
    baseURL:'/api/v1/admin',
    headers:{},
})
//请求拦截器
myAxios.interceptors.request.use(function(config){
    return config
},function(err){
    return Promise.reject(err)
})
//响应拦截器
myAxios.interceptors.response.use(function(response){
    return response
},function(err){
    return Promise.reject(err)
})

export default myAxios