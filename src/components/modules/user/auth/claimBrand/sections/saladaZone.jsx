import Icon from '@/ui/icons'
import { Dropdown, Grid, Input, Text } from '@nextui-org/react'
import { useState } from 'react'
import sheds from '@/src/utils/user/brand/sheds'

const SaladaZone = ({ state, onChange, }) => {
    const [shed, setShed] = useState(""),
        [gallery, setGallery] = useState(""),
        [hallway, setHallway] = useState(""),
        [floor, setFloor] = useState(""),
        [side, setSide] = useState("")

    const handleShed = e => {
        setShed(e)
        if (Object.values(e)[0] !== undefined) {
            onChange("shed")({ target: { value: Object.values(e)[0] } })

        } else {
            onChange("shed")({ target: { value: "" } })
        }
    }
    const handleGallery = e => {
        setGallery(e)
        if (Object.values(e)[0] !== undefined) {
            onChange("galleryName")({ target: { value: Object.values(e)[0] } })
        } else {
            onChange("galleryName")({ target: { value: "" } })
        }
    }

    const handleHallway = e => {

    }

    const handleHallwaySelect = e => {
        setHallway(e)
        if (Object.values(e)[0] !== undefined) {
            onChange("hallway")({ target: { value: Object.values(e)[0] } })
        } else {
            onChange("hallway")({ target: { value: "" } })
        }
    }

    const handleFloor = e => {
        setFloor(e)
        if (Object.values(e)[0] !== undefined) {
            onChange("floor")({ target: { value: Object.values(e)[0] } })
        } else {
            onChange("floor")({ target: { value: "" } })
        }
    }

    const handleSide = e => {
        setSide(e)
        if (Object.values(e)[0] !== undefined) {
            onChange("side")({ target: { value: Object.values(e)[0] } })
        } else {
            onChange("side")({ target: { value: "" } })
        }
    }

    const ShedProps = () => {
        const finder = sheds.find(s => s.shed == state.shed.value)
        if (finder == undefined) {
            return {}
        }
        return finder
    }
    const GalleryProps = () => {
        if (state.shed.value == "GALERIAS") {
            const finder = ShedProps().galleries.find(g => g.name == state.galleryName.value)
            if (finder == undefined) {
                return {}
            }
            return finder
        }
        return false
    }

    const handleStallNumber = (e) => {
        if (GalleryProps().stallLetter == true ) {
            return onChange("stallNumber")({target: { value: e.target.value.replace(/[0-9]/g, '')}})
        }
        return onChange("stallNumber")(e)

    }

    const isHallwayRequired = () => {
        if (GalleryProps().hallways != undefined) {
            return true
        }
        if (ShedProps().requestHallway != undefined || ShedProps().shed == "GALERIAS") {
            return true
        }
        return false
    }

    const UseHallway = () => {
        if (isHallwayRequired()) {
            if (GalleryProps().hallways != undefined) {
                return (
                    <Grid>
                        <Text>
                            ¿En que pasillo esta?
                        </Text>
                        <Dropdown>
                            <Dropdown.Button flat color="$gray">
                                {
                                    hallway.length == 0 ? "Eligé un pasillo" : hallway
                                }
                            </Dropdown.Button>
                            <Dropdown.Menu
                                selectionMode="single"
                                disallowEmptySelection
                                selectedKeys={hallway}
                                onSelectionChange={handleHallwaySelect}
                            >
                                {
                                    GalleryProps().hallways.map(h => (
                                        <Dropdown.Item key={h}>{h}</Dropdown.Item>
                                    ))
                                }

                            </Dropdown.Menu>

                        </Dropdown>
                        <Text small color="error">
                            {state.hallway.error}
                        </Text>
                    </Grid>
                )
            }
            if (ShedProps().requestHallway) {
                return (
                    <Grid>
                        <Text>
                            Numero de pasillo
                        </Text>
                        <Input
                            clearable
                            contentLeft={<Icon id="share_location" />}
                            placeholder="Escribe aqui tu numero de pasillo"
                            helperText={state.hallway.error}
                            helperColor="error"
                            status={state.hallway.error ? "error" : "default"}
                            value={state.hallway.value}
                            onChange={onChange("hallway")} />
                    </Grid>
                )
            }
        }
        return null

    }

    const UseFloor = () => {
        let findInShed = ShedProps().floors

        if (findInShed != undefined) {
            return (
                <Grid>
                    <Text>
                        ¿En que piso esta?
                    </Text>
                    <Dropdown>
                        <Dropdown.Button flat color="$gray">
                            {
                                floor.length == 0 ? "Eligé un piso" : floor
                            }
                        </Dropdown.Button>
                        <Dropdown.Menu
                            selectionMode="single"
                            disallowEmptySelection
                            selectedKeys={floor}
                            onSelectionChange={handleFloor}
                        >
                            {
                                findInShed.map(f => (
                                    <Dropdown.Item key={f}>{f}</Dropdown.Item>
                                ))
                            }

                        </Dropdown.Menu>

                    </Dropdown>
                    <Text small color="error">
                        {state.floor.error}
                    </Text>
                </Grid>
            )
        }
    }

    const UseSide = () => {

        let findInGallery = GalleryProps().sides
        let findInShed = ShedProps().sides
        let sides = false

        if (findInGallery != undefined) {
            sides = findInGallery
        }
        if (findInShed != undefined) {
            sides = findInShed
        }

        if (sides != false) {
            return (
                <Grid>
                    <Text>
                        ¿En que lado esta?
                    </Text>
                    <Dropdown>
                        <Dropdown.Button flat color="$gray">
                            {
                                side.length == 0 ? "Eligé un lado" : side
                            }
                        </Dropdown.Button>
                        <Dropdown.Menu
                            selectionMode="single"
                            disallowEmptySelection
                            selectedKeys={side}
                            onSelectionChange={handleSide}
                        >
                            {
                                sides.map(f => (
                                    <Dropdown.Item key={f}>{f}</Dropdown.Item>
                                ))
                            }

                        </Dropdown.Menu>

                    </Dropdown>
                    <Text small color="error">
                        {state.side.error}
                    </Text>
                </Grid>
            )
        }
    }

    const UseRow = () => {
        let check = false
        if (ShedProps().requestRow != undefined) {
            check = true
        }
        if (GalleryProps().requestRow) {
            check = true
        }


        if (check) {
            return (
                <Grid>
                    <Text>
                        Numero de fila
                    </Text>
                    <Input
                        clearable
                        type="number"
                        contentLeft={<Icon id="share_location" />}
                        placeholder="Escribe aqui tu numero de fila"
                        helperText={state.row.error}
                        helperColor="error"
                        status={state.row.error ? "error" : "default"}
                        value={state.row.value}
                        onChange={onChange("row")} />
                </Grid>
            )
        }

        return null

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
                            shed.length == 0 ? "Eligé una ubicación" : shed
                        }
                    </Dropdown.Button>
                    <Dropdown.Menu
                        selectionMode="single"
                        disallowEmptySelection
                        selectedKeys={shed}
                        onSelectionChange={handleShed}
                    >
                        {
                            sheds.map(s => (
                                <Dropdown.Item key={s.shed}>{s.shed}</Dropdown.Item>
                            ))
                        }

                    </Dropdown.Menu>

                </Dropdown>
                <Text small color="error">
                    {state.shed.error}
                </Text>
            </Grid>
            {
                ShedProps().galleries &&
                <Grid>
                    <Text>
                        ¿En que galeria?
                    </Text>
                    <Dropdown>
                        <Dropdown.Button flat color="$gray">
                            {
                                gallery.length == 0 ? "Eligé una ubicación" : gallery
                            }
                        </Dropdown.Button>
                        <Dropdown.Menu
                            selectionMode="single"
                            disallowEmptySelection
                            selectedKeys={gallery}
                            onSelectionChange={handleGallery}
                        >
                            {
                                ShedProps().galleries.map(g => (
                                    <Dropdown.Item key={g.name}>{g.name}</Dropdown.Item>
                                ))
                            }

                        </Dropdown.Menu>

                    </Dropdown>
                    <Text small color="error">
                        {state.galleryName.error}
                    </Text>
                </Grid>
            }
            <UseHallway />
            <UseFloor />
            <UseSide />
            <UseRow />
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
                    onChange={handleStallNumber} />
            </Grid>



        </Grid.Container>
    )
}

export default SaladaZone