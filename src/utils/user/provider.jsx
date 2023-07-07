import { createContext, useContext, useEffect, useState } from 'react';
import Get from '@/utils/hooks/get'
import jsCookie from 'js-cookie'
import {toast} from 'react-toastify'
import { useRouter } from 'next/router';

const UserContext = createContext();

function useUserContext() {
    return useContext(UserContext);
}

function UserWrapper({ children, state }) {
    const [user, setUser] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const token = jsCookie.get("sldtoken")
        if (token && router?.locale) {
            Get(`/${router?.locale}/user/me?withBrand=true`,{
                headers:{
                    sldtoken: token
                }
            }).then(res => {
                setUser(res.data)
            })
            .catch(err => {
                if (err.response) {
                    console.error(err)
                    return toast(err?.response?.data?.msg)
                }
                return toast("hubo un error con tu token")
            })
        }
    },[state, router])

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
