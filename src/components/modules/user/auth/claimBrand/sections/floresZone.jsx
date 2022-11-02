import Icon from "@/ui/icons"
import { Checkbox, Dropdown, Grid, Input, Text, Popover, Button, Radio } from "@nextui-org/react"
import galeries from '@/utils/user/brand/galeries'
import { useState } from "react"

const SaladaZone = ({ state, onChange }) => {
    const [galery, setGallery] = useState(state.galleryName.value || "")

    const handleGalerySelect = e => {
        setGallery(e)
        if (Object.values(e)[0] !== undefined) {
            onChange("galery")({ target: { value: Object.values(e)[0] } })
        } else {
            onChange("galery")({ target: { value: "" } })
        }
    }

    return (
        <Grid.Container direction="column" >
            <Grid>
                <Grid.Container>
                    <Grid>
                        <Checkbox isSelected={state.isInGallery} onChange={onChange("isInGallery")} label="¿El local es una galeria?" />
                    </Grid>
                </Grid.Container>
            </Grid>
            <Grid>
                <Grid.Container gap={1}>
                    {
                        state.isInGallery &&
                        <>
                            <Grid>
                                <Text>
                                    ¿En que galeria esta?
                                </Text>
                                <Popover>
                                <Popover.Trigger>
                                    <Button auto flat color="$gray">Mostrar Galerias</Button>
                                </Popover.Trigger>
                                <Popover.Content>
                                    <Input/>
                                    <Radio.Group  defaultValue="">
                                        <Radio value="A">Option A</Radio>
                                        <Radio value="B">Option B</Radio>
                                        <Radio value="C">Option C</Radio>
                                        <Radio value="D">Option D</Radio>
                                        <Radio value="E">Option D</Radio>
                                        <Radio value="F">Option D</Radio>
                                        <Radio value="D">Option D</Radio>
                                        <Radio value="D">Option D</Radio>
                                        <Radio value="D">Option D</Radio>
                                        <Radio value="D">Option D</Radio>
                                    </Radio.Group>
                                </Popover.Content>
                                </Popover>
                                {/* <Dropdown>
                                    <Dropdown.Button flat color="$gray">
                                        {
                                            galery.length == 0 ? "Elegir Galeria" : galery
                                        }
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        selectionMode="single"
                                        disallowEmptySelection
                                        selectedKeys={galery}
                                        onSelectionChange={handleGalerySelect}
                                    >
                                        {
                                            galeries.map(g => (
                                                <Dropdown.Item key={g.name} description={`${g.street} ${g.number}`}>
                                                    {g.name}
                                                </Dropdown.Item>
                                            ))
                                        }

                                    </Dropdown.Menu>

                                </Dropdown> */}
                                <Text small color="error">
                                    {state.hallway.error}
                                </Text>
                            </Grid>
                            <Grid>
                                <Input
                                    clearable
                                    label="Número de local"
                                    contentLeft={<Icon id="share_location" />}
                                    placeholder="Escribe aqui el número de local"
                                    helperText={state.positionInGallery.error}
                                    helperColor="error"
                                    status={state.positionInGallery.error ? "error" : "default"}
                                    value={state.positionInGallery.value}
                                    onChange={onChange("positionInGallery")} />
                            </Grid>
                        </>
                    }
                    <Grid>
                        <Input
                            clearable
                            label="Calle"
                            contentLeft={<Icon id="share_location" />}
                            placeholder="Escribe aqui la calle"
                            helperText={state.street.error}
                            helperColor="error"
                            status={state.street.error ? "error" : "default"}
                            value={state.street.value}
                            onChange={onChange("street")} />
                    </Grid>
                    <Grid>
                        <Input
                            clearable
                            type="number"
                            label="Altura de calle"
                            contentLeft={<Icon id="share_location" />}
                            placeholder="Escribe aqui la altura de la calle"
                            helperText={state.streetNumber.error}
                            helperColor="error"
                            status={state.streetNumber.error ? "error" : "default"}
                            value={state.streetNumber.value}
                            onChange={onChange("streetNumber")} />
                    </Grid>

                </Grid.Container>
            </Grid>
        </Grid.Container>
    )
}

export default SaladaZone