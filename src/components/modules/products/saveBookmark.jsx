import Icon from '@/ui/icons'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Bookmarks from '@/src/utils/product/bookmarks'

const SaveBookmark = ({ _id, doubleTap, className, ...htmlProps }) => {
    const [state, setState] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setState(Bookmarks(_id, false))
    }, [router, doubleTap])

    useEffect(() => {
        !doubleTap && setState(Bookmarks(_id, false))
    }, [router])

    const handlerLike = _id => {
        Bookmarks(_id, true)
        setState(!state)
    }

    return (
        <Icon
            color={state ? '$warning' : '$dark'}
            id='favorite'
            className={`pointer transition-25 ${state ? 'bookmark-true' : ''} ${className}`}
            onClick={() => handlerLike(_id)}
            {...htmlProps} 
        />
    )
}

export default SaveBookmark