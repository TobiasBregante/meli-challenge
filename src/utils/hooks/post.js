import axios from 'axios'

const Post = (route,body,config)=>{
    return axios.post(`${process.env.NEXT_PUBLIC_API}${route}`,body,{
        ...config
    })
}

export default Post