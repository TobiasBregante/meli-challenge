import React from 'react';
import Page from "@/src/components/wrapper/page";
import { categories } from "@/src/utils/user/brand/categories";
import { Container } from '@nextui-org/react';
import Cart from "@/src/components/cart";

const CartPage = () => {
    return (
        <Page categories={categories}>
            <Container xl css={{ mb: "$10", ml: 0, mr: 0 }} className='container-fluid'>
                <Cart/>
            </Container>
        </Page>
    );
};

export default CartPage;
