import Icon from "@/ui/icons"
import { Checkbox, Dropdown, Grid, Input, Text, Popover, Button, Radio } from "@nextui-org/react"
import galeries from '@/utils/user/brand/galeries'
import { useState } from "react"

const SaladaZone = ({ state, onChange }) => {
    const [galery, setGallery] = useState(state.galleryName.value || "")
    const [searchGaleries, setSearchGaleries] = useState([]);

    const handleGalerySelect = e => {
        setGallery(e)
        if (Object.values(e)[0] !== undefined) {
            onChange("galleryName")({ target: { value: e } })
        } else {
            onChange("galleryName")({ target: { value: "" } })
        }
    }

    const searcher = (e) => {
        const result = galeries.filter((data) => data.name.toLowerCase().includes(e.target.value.toLowerCase()) && data?.location !== 'Once')
        setSearchGaleries(result)
    };

    const galeryFind = galery.length !== 0 && galeries.filter(g => g.name === galery)

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
                                <Popover size="sm">
                                    <Popover.Trigger >
                                        <Button auto flat color="$gray">
                                            {
                                                galery.length === 0 ? "Mostrar Galeria" : galery
                                            }
                                        </Button>
                                    </Popover.Trigger>
                                    <Popover.Content css={{ p: "$10" }} >
                                        <Radio.Group
                                            defaultValue=""
                                            value={galery}
                                            onChange={handleGalerySelect}
                                        >
                                            <Input labelPlaceholder="Buscar Galerias.."
                                                onChange={searcher}
                                                type="text"
                                            />
                                            <Radio size="sm" value={"Otra Galeria"} description="Consultar al vendedor">Otra Galeria</Radio>

                                            {
                                                searchGaleries.length == 0 ? galeries?.filter(obj => obj?.location !== 'Once').map((galeries, i) => (

                                                    <Radio size="sm" key={i} value={galeries.name} description={`${galeries.street} ${galeries.number}`}>
                                                        {galeries.name}
                                                    </Radio>

                                                )) : searchGaleries.map((galeries, i) => (
                                                    <Radio size="sm" key={i} value={galeries.name} description={`${galeries.street} ${galeries.number}`}>
                                                        {galeries.name}
                                                    </Radio>
                                                ))
                                            }
                                        </Radio.Group>
                                    </Popover.Content>
                                </Popover>
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
                                        value={ galeryFind[0]?.street || state?.street?.value}
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
                                        value={ galeryFind[0]?.number || state?.streetNumber?.value}
                                        onChange={onChange("streetNumber")} />
                                </Grid>
                </Grid.Container>
            </Grid>
        </Grid.Container>
    )
}

export default SaladaZone