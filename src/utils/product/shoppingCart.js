const getShoppingCart = ()=>{
    const shoppingCart = window.localStorage.getItem('shoppingCart');
    if (shoppingCart) {
        return JSON.parse(shoppingCart)
    }
    return []
}

const isInShoppingCart = (_id) =>{
    return getShoppingCart().some(product=>product==_id)
}

const addToShoppingCart = (_id)=>{
    const shoppingCart = getShoppingCart()
    shoppingCart.push(_id)
    window.localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
}
const removeFromShoppingCart = (_id)=>{
    const shoppingCart = getShoppingCart()
    shoppingCart = shoppingCart.filter(product=>_id!=product)
    window.localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
}

const isShoppingCartEmpty = ()=>{
    const shoppingCart = window.localStorage.getItem('shoppingCart');
    if (shoppingCart) {
        return JSON.parse(shoppingCart).length == 0
    }
    return true
}

export {
    getShoppingCart,
    isInShoppingCart,
    addToShoppingCart,
    removeFromShoppingCart,
    isShoppingCartEmpty
}