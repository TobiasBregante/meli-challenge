import Card from '@/ui/cards'
import Text from "@/ui/texts";
import Icon from "@/ui/icons";
import { useState } from 'react';
import Input from "@/ui/inputs"
import Button from "@/ui/buttons"
import { useRouter } from 'next/router';
import { useUserContext } from '@/src/utils/user/provider';
import ShouldLogin from '@/components/modules/user/errors/shouldLogin';
import ShouldBeSeller from '@/components/modules/user/errors/shouldBeSeller';
import ShouldBeAphysicSeller from '@/components/modules/user/errors/shouldBeAphysicSeller';
import Select from '@/ui/selects';
import Checkbox from '@/src/components/ui/inputs/checkbox';

const ClaimPositionModule = () => {

    const router = useRouter()
    const user = useUserContext()

    const [state, setState] = useState({
        shed: "",
        stallNumber: "",
        hallway: "",
        isInGallery: false,
        numberIngallery:"",
        street:"",
        streetNumber:"",
        category: "",
        shippingBy: "",
        payMethod: "",
        
    })

    if (!user) {
        return (
            <ShouldLogin />
        )
    }
    if (!user.isSeller) {
        return (
            <ShouldBeSeller />
        )
    }
    if (user.isSeller && location == 2) {
        return (
            <ShouldBeAphysicSeller />
        )
    }

    const handleState = (name) => (e) => {
        setState({ ...state, [name]: e.target.value })
    }

    const handleIngallery = (e) => {
        setState({ ...state, isInGallery: e.target.checked })
    }

    return (
        <div className="container d-flex justify-content-center">
            <Card className="mt-3 col-12 col-lg-7 p-3 mb-5">
                <Text weight={600} tag="h3" className="text-center">
                    Reclamar puesto
                </Text>
                <Text weight={700} tag="h4">
                    Indicar ubicación del puesto
                </Text>
                {
                    false ?
                        <>
                            <Select
                                label="Ubicación de su puesto"
                                onChange={handleState("shed")}>
                                <Select.Option>Punta mogote</Select.Option>
                                <Select.Option>Urkupiña</Select.Option>
                                <Select.Option>Los coreanos</Select.Option>
                                <Select.Option>Oceans</Select.Option>
                                <Select.Option>Galerias</Select.Option>
                            </Select>

                            <div className="d-flex flex-row mt-3">
                                <Input
                                    type="number"
                                    label="Numero de pasillo"
                                    placeholder="Escribe aqui"
                                    onChange={handleState("hallway")} />
                                <Input
                                    type="number"
                                    label="Numero de puesto"
                                    placeholder="Escribe aqui"
                                    onChange={handleState("stallNumber")}
                                    className="ms-2" />
                            </div>
                        </>
                        :
                        <>
                            <Checkbox
                                label="¿Su local se encuentra en una galería?"
                                className="my-3"
                                size={5}
                                onChange={handleIngallery} />
                            {
                                state.isInGallery &&
                                <>
                                    <Input
                                        type="text"
                                        label="Numero de local/letra"
                                        placeholder="Escribe aqui"
                                        onChange={handleState("numberIngallery")}
                                        className="my-2 me-2 animate__animated animate__fadeIn" />


                                </>
                            }
                            <div className="d-flex flex-row mt-1">
                                <Input
                                    type="text"
                                    label="Calle"
                                    placeholder="Escribe aqui"
                                    onChange={handleState("street")}
                                    className="me-2" />
                                <Input
                                    type="number"
                                    label="Numero de calle"
                                    placeholder="Escribe aqui"
                                    onChange={handleState("streetNumber")}
                                    className="me-2" />
                            </div>

                        </>
                }

                <Input
                    type="text"
                    label="Rubro del puesto"
                    placeholder="Escribe aqui"
                    onChange={handleState("category")}
                    className="mt-3" />


                <Input
                    type="text"
                    label="Transporte de envios"
                    placeholder="Escribe aqui"
                    onChange={handleState("shippingBy")}
                    className="mt-3" />

                <Input
                    type="text"
                    label="Medios de pago"
                    placeholder="Escribe aqui tus medios de pago separados por una coma"
                    onChange={handleState("payMethod")}
                    className="mt-3" />

                <div className="d-flex justify-content-end">
                    <Button color="info-300" className="col-12 col-lg-4 mt-4 d-flex justify-content-center" >

                        <Text weight="700">
                            Registrar puesto
                        </Text>
                        <Icon id="add_business" className="ms-2" />
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default ClaimPositionModule