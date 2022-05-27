import axios from 'axios'

const Put = (route,body,config)=>{
    return axios.put(`${process.env.NEXT_PUBLIC_API}/api/${route}`,body,{
        ...config
    })
}

export default Put