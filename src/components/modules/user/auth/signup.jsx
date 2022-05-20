import Card from '@/ui/cards'
import Text from "@/ui/texts";
import Icon from "@/ui/icons";
import { useState } from 'react';
import Input from "@/ui/inputs"
import InputPassword from "@/ui/inputs/password"
import Checkbox from "@/ui/inputs/checkbox"
import Button from "@/ui/buttons"
import Link from 'next/link';

const Option = ({ value, text, icon, isSelected, onClick }) => (
    <div onClick={() => onClick(value)} className={`d-flex flex-column rounded-16 p-3 pointer mx-2 bg-gray-${isSelected ? "500" : "100"}`}>
        <Icon id={icon} className="fs-1 text-center" />
        <Text weight={600}>
            {text}
        </Text>
    </div>
)

const SignUpModule = () => {
    const [state, setState] = useState({
        accountType: "",
        sellLocation: "",
    })

    const handleOption = (key) => (v) => {
        setState({ ...state, [key]: v })
    }


    return (
        <div className="container d-flex justify-content-center">
            <Card className="mt-3 col-12 col-lg-8 p-3 mb-5">
                <Text weight={600} tag="h3" className="text-center">
                    Registrate en SaladaApp
                </Text>
                <div className="d-flex flex-column mt-3">
                    <Text tag="h4">
                        ¿Qué te gustaria ser?
                    </Text>
                    <div className="d-flex mb-4">
                        <Option
                            text="Comprador/a"
                            icon="shopping_cart"
                            isSelected={state.accountType == "comprador"}
                            value="comprador"
                            onClick={handleOption("accountType")} />
                        <Option
                            text="Vendedor/a"
                            icon="store"
                            isSelected={state.accountType == "vendedor"}
                            value="vendedor"
                            onClick={handleOption("accountType")} />
                    </div>

                    {
                        state.accountType == "vendedor" &&
                        <>
                            <Text tag="h4">
                                ¿Donde planeas vender?
                            </Text>
                            <div className="d-flex mb-4">
                                <Option
                                    text="La salada"
                                    icon="pin_drop"
                                    isSelected={state.sellLocation == "salada"}
                                    value="salada"
                                    onClick={handleOption("sellLocation")} />
                                <Option
                                    text="Flores"
                                    icon="pin_drop"
                                    isSelected={state.sellLocation == "flores"}
                                    value="flores"
                                    onClick={handleOption("sellLocation")} />
                                <Option
                                    text="Online"
                                    icon="language"
                                    isSelected={state.sellLocation == "online"}
                                    value="online"
                                    onClick={handleOption("sellLocation")} />
                            </div>
                        </>
                    }
                    <Text tag="h4">
                        Tus datos personales
                    </Text>
                    <div className="col-12 col-lg-6">
                        <Input
                            iconRight={<Icon id="person" />}
                            label="Nombre"
                            className="mb-2"
                            clearable
                            value=""
                            min={3} />
                        <Input
                            iconRight={<Icon id="person" />}
                            label="Apellido"
                            className="mb-2"
                            clearable
                            value=""
                            min={3} />
                        <Input
                            iconRight={<Icon id="mail" />}
                            type="email"
                            label="Email"
                            className="mb-2"
                            clearable
                            value=""
                            max={128} />
                        <Input
                            iconRight={<Icon id="call" />}
                            type="number"
                            label="Numero de celular"
                            className="mb-2"
                            clearable
                            value=""
                            max={9999999999} />
                        <InputPassword
                            label="Contraseña"
                            className="mb-2"
                            clearable
                            value=""
                            min={3} />
                        <InputPassword
                            label="Confirmar contraseña"
                            className="mb-4"
                            clearable
                            value=""
                            min={3} />

                    </div>
                    <Text tag="h5">
                        ¿De que manera venderas?
                    </Text>
                    <div className="d-flex">
                        <Checkbox label="por menor" size={5} color="danger-500" className="me-4" />

                        <Checkbox label="por mayor" size={5} color="danger-500" />
                    </div>

                    <div className="d-flex justify-content-center mb-2">
                        <Button color="info-300" className="col-12 col-lg-4 mt-4 d-flex justify-content-center">

                            <Text weight="700">
                                Registrarme
                            </Text>
                            <Icon id="person_add" className="ms-2" />
                        </Button>
                    </div>

                    <Text>
                        ¿Ya tienes cuenta? &nbsp;
                        <Link href="/./user/auth/signin">
                            <Text weight="700" color="primary" className="pointer">
                                Ingresar
                            </Text>
                        </Link>
                    </Text>
                </div>
            </Card>
        </div>
    )
}

export default SignUpModule