import Icon from '@/ui/icons'
import { useEffect, useState } from 'react'
import { addBookmark, removeBookmark, isBookmarked } from '@/utils/product/bookmarks'

const SaveBookmark = ({ _id, bent, doubleTap, className, ...htmlProps }) => {
    const [state, setState] = useState(false)

    useEffect(()=>{
        setState(isBookmarked(_id))
    }, [state, _id, doubleTap])

    useEffect(() => {
        doubleTap != state && setState(!state)
        handleSave()
    }, [doubleTap])

    const handleSave = () => {
        if (!state == true) {
            addBookmark(_id)
        }else{
            removeBookmark(_id)
        }
        setState(!state)
    }

    return (
        <Icon
            color={state ? '$warning' : '$dark'}
            id='favorite'
            className={`pointer transition-25 ${(state) && "bookmark-true"} ${className}`}
            onClick={handleSave}
            {...htmlProps} 
        />
    )
}

export default SaveBookmark