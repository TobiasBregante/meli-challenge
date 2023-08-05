import GetItem from "../localStorage/getItem"
import SetItem from "../localStorage/setItem"

const ViewedProducts = (product, opened) => {
    let likesList = typeof GetItem('viewedProducts')?.viewedProducts === 'undefined' ? [] : GetItem('viewedProducts')?.viewedProducts
    if (product && opened) {
        if (!likesList?.some(storage => storage?._id === product?._id)) {
            likesList?.push(product) 
            SetItem('viewedProducts', likesList?.reverse()?.slice(0, 10))
        }
        return false
    } else {
        return likesList
    }
}

export default ViewedProducts