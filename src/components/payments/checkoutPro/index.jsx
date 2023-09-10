import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, useModal, Button, Text, Input, Grid } from "@nextui-org/react";

const CheckoutPro = ({ data }) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const { setVisible, bindings } = useModal();

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            // Crea una preferencia de pago en el servidor
            const response = await axios.post('/api/create-payment', JSON.stringify({
                items: [
                    {
                        id: data?._id,
                        title: data?.title,
                        unit_price: parseFloat(data?.prices?.retail),
                        quantity: 1
                    },
                ],
                payer: {
                    name: nombre,
                    email: email
                }
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            window.location.href = response.data.init_point;
        } catch (error) {
            console.error('Preference payment create failure:', error);
        }
    };

    return (
        <Fragment>
            <Button 
                size={'md'}
                className='contactBtnProduct'
                auto
                shadow
                css={{ bg: "$whatsapp", w: "100%", mb: 10 }}
                onPress={() => setVisible(true)}>
                Comprar
            </Button>
            <Modal
                scroll
                fullScreen
                closeButton
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Pagá tu compra
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Grid.Container gap={4} justify='center'>
                        <form onSubmit={handleSubmit} className='formPay'>
                            <Grid xs={12}>
                                <Input
                                    auto
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                    bordered
                                    type={'text'}
                                    labelPlaceholder="Nombre"
                                    color="primary"
                                    css={{ w: "100%" }} />
                            </Grid>
                            <Grid xs={12}>
                                <Input
                                    auto
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    bordered
                                    type={'email'}
                                    labelPlaceholder="Email"
                                    color="primary"
                                    css={{ w: "100%" }} />
                            </Grid>
                            <Grid xs={12}>
                                <Button
                                    type='submit'
                                    size={'md'}
                                    className='btnPay'
                                    auto
                                    shadow
                                    css={{ bg: "$whatsapp", w: "100%" }}>
                                    Pagar
                                </Button>
                            </Grid>
                        </form>
                    </Grid.Container>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default CheckoutPro