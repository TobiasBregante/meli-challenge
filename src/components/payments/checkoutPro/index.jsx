import { Fragment, useState } from 'react';
import axios from 'axios';
import { Modal, useModal, Button, Text, Input, Grid } from "@nextui-org/react";
import { useRouter } from 'next/router';

const CheckoutPro = ({ data, contact }) => {
    const router = useRouter()
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [stateName, setStateName] = useState('');
    const [address, setAddress] = useState('');
    const [addressNumber, setAddressNumber] = useState('');    
    const [postalCode, setPostalCode] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const { setVisible, bindings } = useModal();
    const { ref } = router?.query

    const handleSubmit = async e => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/api/create-payment', JSON.stringify({
                items: [
                    {
                        id: data?._id,
                        title: `${data?.title} - #${ref}`,
                        unit_price: parseFloat(data?.prices?.retail),
                        currency_id: 'ARS',
                        category_id: data?.category,
                        description: data?.description,
                        quantity: 1,
                        picture_url: `https://res.cloudinary.com/saladapp/${data?.imgs[0]}`
                    },
                ],
                payer: {
                    name: nombre,
                    surname: lastName,
                    email: email,
                    address: {
                        zip_code: postalCode,
                        street_name: address,
                        street_number: addressNumber
                    },
                    phone: {
                        area_code: "",
                        number: phone
                    }
                },
                shipments: {
                    receiver_address: {
                        zip_code: postalCode,
                        street_name: address,
                        street_number: addressNumber,
                        city_name: city,
                        state_name: stateName,
                        country_name: 'Argentina'
                    }
                },
                additional_information: {
                    city: city,    
                    email: email,
                    name: nombre,
                    last_name: lastName,
                    country: 'Argentina',
                    ref: ref
                },
                back_urls: {
                    success: contact
                },
                auto_return: "approved"
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            window.location.href = response.data.init_point;
        } catch (error) {
            console.error('Preference payment create failure: ', error);
        }
    };
    
    return (
        <Fragment>
            <Button 
                size={'md'}
                auto
                shadow
                color={'gradient'}
                css={{  w: "100%", mb: 10 }}
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
                        Terminá de Pagar tu compra - Completá los datos del envío.
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Grid.Container gap={2} justify='center'>
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
                                    css={{ w: "45%", marginRight: '5%' }} />
                                <Input
                                    auto
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    bordered
                                    type={'text'}
                                    labelPlaceholder="Apellido"
                                    color="primary"
                                    css={{ w: "45%", marginLeft: '5%' }} />
                            </Grid>
                            <Grid xs={12}>
                                <Input
                                    auto
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    bordered
                                    type={'text'}
                                    labelPlaceholder="Ciudad"
                                    color="primary"
                                    css={{ w: "45%", marginRight: '5%' }} />
                                <Input
                                    auto
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                    bordered
                                    type={'text'}
                                    labelPlaceholder="Calle"
                                    color="primary"
                                    css={{ w: "45%", marginLeft: '5%' }} />
                            </Grid>
                            <Grid xs={12}>
                                <Input
                                    auto
                                    value={addressNumber}
                                    onChange={(e) => setAddressNumber(e.target.value)}
                                    required
                                    bordered
                                    type={'text'}
                                    labelPlaceholder="Altura de calle"
                                    color="primary"
                                    css={{ w: "45%", marginRight: '5%' }} />
                                <Input
                                    auto
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    required
                                    bordered
                                    type={'text'}
                                    labelPlaceholder="Código postal"
                                    color="primary"
                                    css={{ w: "45%", marginLeft: '5%' }} />
                            </Grid>
                            <Grid xs={12}>
                                <Input
                                    auto
                                    value={stateName}
                                    onChange={(e) => setStateName(e.target.value)}
                                    required
                                    bordered
                                    type={'text'}
                                    labelPlaceholder="Provincia"
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
                                <Input
                                    auto
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    bordered
                                    type={'text'}
                                    labelPlaceholder="Celular/WhatsApp"
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