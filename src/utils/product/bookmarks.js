import GetItem from "../localStorage/getItem"
import SetItem from "../localStorage/setItem"
 
const Bookmarks = (_id, clicked) => {
    let likesList = typeof GetItem('bookmarks')?.bookmarks === 'undefined' ? [] : GetItem('bookmarks')?.bookmarks
    if (_id && clicked) {
        if (likesList?.some(storage => storage === _id)) {
            const index = likesList?.indexOf(_id)
    
            if (index > -1) {
                likesList?.splice(index, 1)
            }
        } else {
            likesList?.push(_id)
        }
        SetItem('bookmarks', likesList)
        return _id && likesList?.some(storage => storage === _id)
    }
    if (_id && !clicked) {
        return _id && likesList?.some(storage => storage === _id)
    }
}

export default Bookmarks