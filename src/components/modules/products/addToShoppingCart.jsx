import Icon from '@/ui/icons'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { isInShoppingCart, addToShoppingCart, removeFromShoppingCart } from '@/utils/product/shoppingCart'

const AddToShoppingCart = ({ _id, className }) => {
    const [state, setState] = useState(false)

    useEffect(()=>{
        setState(isInShoppingCart(_id))
    },[state,_id])

    const handleAdding = () => {
        if (!state == true) {
            toast("Añadido a tu carrito de compras")
            addToShoppingCart(_id)
        } else {
            toast("Removido de tu carrito de compras")
            removeFromShoppingCart(_id)
        }
        setState(!state)
    }
    return (
        <Icon
            id={state ? "shopping_cart" : "add_shopping_cart"}
            className={`pointer transition-25 ${state && "text-warning"} ${className}`}
            onClick={handleAdding} />
    )
}

export default AddToShoppingCart