import axios from 'axios'

const Get = async (route, config) => {    
    const result = await (await (axios.get(`${process.env.NEXT_PUBLIC_API}${route}`,{
        //if they are set to true, will throw a cors error
        //withCredentials: true,
        ...config
    })))

    return result
}

export default Get