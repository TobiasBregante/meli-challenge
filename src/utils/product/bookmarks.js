const getBookmarks = ()=>{
    const bookmarks = window.localStorage.getItem('bookmarks');
    if (bookmarks) {
        return JSON.parse(bookmarks)
    }
    return []
}

const isBookmarked = (_id) =>{
    return getBookmarks().some(bookmark=>bookmark==_id)
}

const addBookmark = (_id)=>{
    const bookmarks = getBookmarks()
    bookmarks.push(_id)
    window.localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}
const removeBookmark = (_id)=>{
    const bookmarks = getBookmarks()
    bookmarks = bookmarks.filter(bookmark=>_id!=bookmark)
    window.localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}

export {
    getBookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked
}