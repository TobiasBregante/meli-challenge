import React, { Fragment, useEffect, useState } from 'react';
import { Button, Container } from '@nextui-org/react';
import Icon from '../ui/icons';
import { useRouter } from 'next/router';
import {
    addToCart,
    getCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    getCartItemCount,
    getTotalCartValue,
} from '@/src/context/cartContext'; // Ajusta la ruta según sea necesario

const CartComponent = () => {
    const [cart, setCart] = useState([]);
    const [includeShipping, setIncludeShipping] = useState(false); // Estado para incluir el envío
    const router = useRouter();
    const shippign_tax = 6500

    useEffect(() => {
        setCart(getCart()); // Actualizar el estado del carrito al montar el componente
    }, []);

    const goToHome = () => router?.push(`/./${router?.locale}`);

    const handleRemoveFromCart = (id) => {
        removeFromCart(id);
        setCart(getCart()); // Actualizar el estado del carrito después de remover un item
    };

    const handleClearCart = () => {
        clearCart();
        setCart([]);
    };

    const handleUpdateQuantity = (id, quantity) => {
        updateQuantity(id, quantity);
        setCart(getCart()); 
    };

    const handleToggleShipping = () => {
        setIncludeShipping(!includeShipping);
    };

    const toWpp = () => {
        const items = cart.map(item => {
            const shortTitle = item.title.slice(0, 15);
            return `*- ${shortTitle}*... x ${item.quantity}`;
        }).join('\n');

        const totalAmount = calculateTotal();

        let message = `**Nuevo pedido:**\n\n`;

        message += `**Productos:**\n${items}\n`;

        message += `\n**Total a pagar:** ${totalAmount}\n`;

        if (includeShipping) {
            message += `**Incluye envío (+${shippign_tax.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })})**\n`;
        } else {
            message += `**Por (+${shippign_tax.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}) llega a tu casa**\n`;
        }

        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = '5491124767008';
        handleClearCart()
        window.open(`https://api.whatsapp.com/send?text=${encodedMessage}&phone=${phoneNumber}`);
    };

    const calculateTotal = () => {
        let total = getTotalCartValue();

        if (includeShipping) {
            total += shippign_tax;
        }

        return total.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
        });
    };

    return (
        <Container className='cart-box'>
            <h1>Lista de Compras</h1>
            <ul>
                {cart.map(item => (
                    <li key={item._id}>
                        {item.title.slice(0, 15)}... - <span className='quantity-item'>x {item.quantity}</span>
                        <Button.Group color=''>
                            <Button className='btn-quantity-cart' onClick={() => handleRemoveFromCart(item._id)} icon={<Icon id="delete" color='#E74C3C' />} />
                            <Button className='btn-quantity-cart' onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)} icon={<Icon id="add" />} />
                            <Button className='btn-quantity-cart' onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)} icon={<Icon id="remove" />} />
                        </Button.Group>
                    </li>
                ))}
            </ul>
            {getCartItemCount() > 0 && <Button size={'sm'} color={'warning'} onPress={handleClearCart}>Vaciar Carrito</Button>}
            {
                getCartItemCount() > 0 ? <div className='totalPayContainer'>
                    <p className='item-amount'>
                        Total de Artículos: {getCartItemCount()}
                    </p>
                    <p className='item-amount'>
                        Total a pagar: {calculateTotal()}
                    </p>
                    <p className='item-amount'>
                        <label>
                            <input type="checkbox" checked={includeShipping} onChange={handleToggleShipping} /> Incluir envío (+{shippign_tax.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })})
                        </label>
                    </p>
                    <Button onPress={toWpp} className='finishPayBtn'>
                        Finalizar compra
                    </Button>
                </div> : <Fragment>
                    <h2>Su lista está vacía</h2>
                </Fragment>
            }
            <Button size={'sm'} color={'gradient'} onPress={goToHome}>Seguir comprando</Button>
        </Container>
    );
};

export default CartComponent;
