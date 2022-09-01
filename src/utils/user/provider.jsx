import { createContext, useContext, useEffect, useState } from 'react';
import Get from '@/utils/hooks/get'
import jsCookie from 'js-cookie'
import {toast} from 'react-toastify'

const UserContext = createContext();

function useUserContext() {
    return useContext(UserContext);
}

function UserWrapper({ children, state }) {
    const [user, setUser] = useState(false)

    useEffect(()=>{
        const token = jsCookie.get("sldtoken")
        if (token) {
            Get("user/me?withBrand=true",{
                headers:{
                    sldtoken: token
                }
            }).then(res =>{
                setUser(res.data)
            })
            .catch(err=>{
                if (err.response) {
                    return toast(err.response.data.msg)
                }
                return toast("hubo un error con tu token")
            })
        }
    },[state])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}


export default UserWrapper;

export {
    useUserContext,
    UserWrapper
}
