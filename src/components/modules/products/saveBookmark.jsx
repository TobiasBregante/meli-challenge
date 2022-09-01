import Icon from '@/ui/icons'
import {toast} from 'react-toastify'
import { useEffect, useState } from 'react'
import { addBookmark, removeBookmark, isBookmarked } from '@/utils/product/bookmarks'

const SaveBookmark = ({ _id, className, ...htmlProps }) => {
    const [state, setState] = useState(false)

    useEffect(()=>{
        setState(isBookmarked(_id))
    },[state,_id])

    const handleSave = ()=>{
        if (!state == true) {
            toast("Añadido a tus favoritos")
            addBookmark(_id)
        }else{
            toast("Removido de tus favoritos")
            removeBookmark(_id)
        }
        setState(!state)
    }

    return (
        <Icon
            id={state ? "person" : "person_add"}
            className={`pointer transition-25 ${state && "text-warning"} ${className}`}
            onClick={handleSave}
            {...htmlProps} />
    )
}

export default SaveBookmark