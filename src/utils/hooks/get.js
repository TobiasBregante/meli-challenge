import axios from 'axios'

const Get = (route,config)=>{
    return axios.get(`${process.env.NEXT_PUBLIC_API}/api/${route}`,{
        //if they are set to true, will throw a cors error
        //withCredentials: true,
        ...config
    })
}

export default Get