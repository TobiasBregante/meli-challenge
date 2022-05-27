import axios from 'axios'

const Get = (route,config)=>{
    return axios.put(`${process.env.NEXT_PUBLIC_API}/api/${route}`,{
        ...config
    })
}

export default Get