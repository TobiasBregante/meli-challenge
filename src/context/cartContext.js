const getCart = () => {
    if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
};

const saveCart = (cart) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
};

const addToCart = (item) => {
    const cart = getCart();
    const existingItem = cart.find(cartItem => cartItem._id === item._id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    saveCart(cart);
};

const removeFromCart = (id) => {
    const cart = getCart();
    const updatedCart = cart.filter(item => item._id !== id);
    saveCart(updatedCart);
};

const clearCart = () => {
    saveCart([]);
};

const updateQuantity = (id, quantity) => {
    const cart = getCart();
    const updatedCart = cart.map(item =>
        item._id === id ? { ...item, quantity: quantity } : item
    );
    saveCart(updatedCart);
};

const getCartItemCount = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
};

const getTotalCartValue = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.prices.retail * item.quantity, 0);
};

export { addToCart, removeFromCart, clearCart, updateQuantity, getCart, getCartItemCount, getTotalCartValue };
