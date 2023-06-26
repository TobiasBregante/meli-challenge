import Icon from "@/ui/icons";
import { Grid, Input, Text } from "@nextui-org/react";
import { Fragment } from "react";

const PersonalData = ({ state, setState, }) => {

    const handleInput = (key) => (e) => {
        setState({
            ...state,
            [key]: {
                error:"",
                value: e.target.value
            }
        })
    }

    return (
        <Fragment>
            <Text tag="h4" weight={700}>
                Tus datos personales
            </Text>
            <Grid.Container direction="column">
                <Input
                    clearable
                    contentLeft={<Icon id="person" />}
                    label="Nombre - Escribe tu nombre real, no el de tu marca"
                    placeholder="Escribe aqui tu nombre" value={state.name.value}
                    onChange={handleInput("name")}
                    helperText={state.name.error}
                    helperColor="error"
                    status={state.name.error?"error":"default"}
                    css={{ mb: 20 }}
                    min={3} />
                <Input
                    clearable
                    contentLeft={<Icon id="person" />}
                    label="Apellido"
                    placeholder="Escribe aqui tu apellido"
                    value={state.lastName.value}
                    onChange={handleInput("lastName")}
                    helperText={state.lastName.error}
                    helperColor="error"
                    status={state.lastName.error?"error":"default"}
                    css={{ mb: 20 }}
                    min={3} />
                <Input
                    clearable
                    contentLeft={<Icon id="mail" />}
                    type="email"
                    label="Correo electrónico"
                    placeholder="Escribe aqui tu email"
                    value={state.email.value}
                    onChange={handleInput("email")}
                    helperText={state.email.error}
                    helperColor="error"
                    status={state.email.error?"error":"default"}
                    css={{ mb: 20 }}
                    max={128} />
                <Input
                    clearable
                    contentLeft={<Icon id="call" />}
                    type="text"
                    label="Numero de celular"
                    placeholder="Escribe aqui tu celular"
                    value={state.cellPhone.value}
                    onChange={handleInput("cellPhone")}
                    helperText={state.cellPhone.error}
                    helperColor="error"
                    status={state.cellPhone.error?"error":"default"}
                    css={{ mb: 20 }}
                    min={8}
                    max={14} />

                <Input.Password
                    clearable
                    contentLeft={<Icon id="lock" />}
                    label="Contraseña"
                    placeholder="Escribe aqui tu contraseña"
                    className="my-2"
                    value={state.password.value}
                    onChange={handleInput("password")}
                    helperText={state.password.error}
                    helperColor="error"
                    status={state.password.error?"error":"default"}
                    css={{ mb: 20 }}
                    min={6} />
                <Input.Password
                    clearable
                    contentLeft={<Icon id="lock" />}
                    label="Confirmar contraseña"
                    placeholder="Escribe aqui tu contraseña otra vez"
                    className="mb-4"
                    value={state.rePassword.value}
                    onChange={handleInput("rePassword")}
                    helperText={state.rePassword.error}
                    helperColor="error"
                    status={state.rePassword.error?"error":"default"}
                    css={{ mb: 20 }}
                    min={6} />

            </Grid.Container>
        </Fragment>
    )
}

export default PersonalData