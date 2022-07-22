import Icon from "@/ui/icons"
import { Checkbox, Grid, Input } from "@nextui-org/react"

const SaladaZone = ({ state, onChange }) => {
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
                                <Input
                                    clearable
                                    label="Nombre de la galeria"
                                    contentLeft={<Icon id="share_location" />}
                                    placeholder="Escribe aqui la galeria"
                                    helperText={state.galleryName.error}
                                    helperColor="error"
                                    status={state.galleryName.error ? "error" : "default"}
                                    value={state.galleryName.value}
                                    onChange={onChange("galleryName")} />
                            </Grid>
                            <Grid>
                                <Input
                                    clearable
                                    label="Posición en la galeria"
                                    contentLeft={<Icon id="share_location" />}
                                    placeholder="Escribe aqui la posición"
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