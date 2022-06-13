import Input from "@/ui/inputs"
import InputPassword from "@/ui/inputs/password"
import Text from "@/ui/texts";
import Icon from "@/ui/icons";

const PersonalData = ({state,handleInput,handlePassword, isValidRepassword}) => {
    return (
        <>
            <Text tag="h4" weight={700}>
                Tus datos personales
            </Text>
            <div className="col-12 col-lg-12">
                <Input
                    iconRight={<Icon id="person" />}
                    label="Nombre - Escribe tu nombre real, no el de tu marca"
                    placeholder="Escribe aqui tu nombre"
                    className="mb-2"
                    clearable
                    value={state.name}
                    onChange={handleInput("name")}
                    min={3} />
                <Input
                    iconRight={<Icon id="person" />}
                    label="Apellido"
                    placeholder="Escribe aqui tu apellido"
                    className="mb-2"
                    clearable
                    value={state.lastName}
                    onChange={handleInput("lastName")}
                    min={3} />
                <Input
                    iconRight={<Icon id="mail" />}
                    type="email"
                    label="Email"
                    placeholder="Escribe aqui tu email"
                    className="mb-2"
                    clearable
                    value={state.email}
                    onChange={handleInput("email")}
                    max={128} />
                <Input
                    iconRight={<Icon id="call" />}
                    type="text"
                    label="Numero de celular"
                    placeholder="Escribe aqui tu celular"
                    className="mb-2"
                    clearable
                    value={state.cellPhone}
                    onChange={handleInput("cellPhone")}
                    min={8}
                    max={10} />

                <InputPassword
                    label="Contraseña"
                    placeholder="Escribe aqui tu contraseña"
                    className="my-2"
                    clearable
                    value={state.password}
                    onChange={handlePassword("password")}
                    min={6} />
                <InputPassword
                    label="Confirmar contraseña"
                    placeholder="Escribe aqui tu contraseña otra vez"
                    className="mb-4"
                    clearable
                    value={state.rePassword}
                    isValid={isValidRepassword}
                    onChange={handlePassword("rePassword")}
                    min={6} />

            </div>
        </>
    )
}

export default PersonalData