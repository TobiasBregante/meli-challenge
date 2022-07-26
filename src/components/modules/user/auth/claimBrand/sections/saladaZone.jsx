import Icon from '@/ui/icons'
import { Dropdown, Grid, Input, Text } from '@nextui-org/react'
import { useState } from 'react'

const SaladaZone = ({ state, onChange }) => {
    const [shed, setShed] = useState("")

    const handleShed = e => {
        setShed(e)
        if (Object.values(e)[0] !== undefined) {
            onChange("shed")({ target: { value: Object.values(e)[0] } })
        } else {
            onChange("shed")({ target: { value: "" } })
        }

    }


    return (
        <Grid.Container gap={2}>
            <Grid>
                <Text>
                    ¿En que galpón estan?
                </Text>
                <Dropdown>
                    <Dropdown.Button flat color="$gray">
                        {
                            state.shed.value.length == 0 ? "Eligé una ubicación" : state.shed.value
                        }
                    </Dropdown.Button>
                    <Dropdown.Menu
                        selectionMode="single"
                        selectedKeys={shed}
                        onSelectionChange={handleShed}
                    >
                        <Dropdown.Item key="punta mogote">Punta mogote</Dropdown.Item>
                        <Dropdown.Item key="urkupiña">Urkupiña</Dropdown.Item>
                        <Dropdown.Item key="los coreanos">Los koreanos</Dropdown.Item>
                        <Dropdown.Item key="oceans">Oceans</Dropdown.Item>
                        <Dropdown.Item key="galerias">Galerias</Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>
                <Text small color="error">
                    {state.shed.error}
                </Text>
            </Grid>
            <Grid>
                <Text>
                    Numero de puesto
                </Text>
                <Input
                    clearable
                    contentLeft={<Icon id="share_location" />}
                    placeholder="Escribe aqui tu numero de puesto"
                    helperText={state.stallNumber.error}
                    helperColor="error"
                    status={state.stallNumber.error ? "error" : "default"}
                    value={state.stallNumber.value}
                    onChange={onChange("stallNumber")} />
            </Grid>
            <Grid>
                <Text>
                    Numero de pasillo
                </Text>
                <Input
                    clearable
                    type="number"
                    contentLeft={<Icon id="share_location" />}
                    placeholder="Escribe aqui tu numero de pasillo"
                    helperText={state.hallwayNumber.error}
                    helperColor="error"
                    status={state.hallwayNumber.error ? "error" : "default"}
                    value={state.hallwayNumber.value}
                    onChange={onChange("hallwayNumber")} />
            </Grid>

            {
                state.shed.value == "urkupiña" &&
                <Grid>
                    <Text>
                        Numero de fila
                    </Text>
                    <Input
                        clearable
                        type="number"
                        contentLeft={<Icon id="share_location" />}
                        placeholder="Escribe aqui tu numero de fila"
                        helperText={state.rowNumber.error}
                        helperColor="error"
                        status={state.rowNumber.error ? "error" : "default"}
                        value={state.rowNumber.value}
                        onChange={onChange("rowNumber")} />
                </Grid>
            }
        </Grid.Container>
    )
}

export default SaladaZone