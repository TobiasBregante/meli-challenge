import Icon from '@/ui/icons'
import { Button, Dropdown, Grid, Input, Text, Card, Row, Spacer } from '@nextui-org/react'
import { useState } from 'react'
import sheds from '@/src/utils/user/brand/sheds'

const UseHallway = ({ GalleryProps, ShedProps, side, state, onChange, hallway, setHallway }) => {
    const handleHallwaySelect = e => {
        setHallway(Object.values(e)[0])
        console.log({ e })
        if (Object.values(e)[0] !== undefined) {
            onChange("hallway")({ target: { value: Object.values(e)[0] } })
        } else {
            onChange("hallway")({ target: { value: "" } })
        }
    }

    let findInGallery = GalleryProps().sides
    let findInShed = ShedProps().sides
    let sides = false

    if (findInGallery != undefined) {
        sides = findInGallery
    }
    if (findInShed != undefined) {
        sides = findInShed
    }

    const requestHallway = () => {
        if (state.side.value == "Pasillo") {
            return true
        }
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
                                hallway.length === 0 ? "Eligé un pasillo" : hallway
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
        if (requestHallway()) {
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

const SaladaZone = ({ state, onChange, data, user, stands: standsArray, setStands: setStandsArray }) => {
    const [shed, setShed] = useState(state?.shed?.value),
        [gallery, setGallery] = useState(state?.galleryName?.value),
        [floor, setFloor] = useState(state?.floor?.value),
        [side, setSide] = useState(state?.side?.value),
        [hallway, setHallway] = useState(state?.hallway?.value || ""),
        [stallNumber, setStallNumber] = useState(state?.stallNumber?.value),
        [row, setRow] = useState(state?.row?.value)

        const[showAddStandButton, setShowAddStandButton]= useState(false);


    const handleShed = e => {
        setShed(Object.values(e)[0])
        if (Object.values(e)[0] !== undefined) {
            onChange("shed")({ target: { value: Object.values(e)[0] } })

        } else {
            onChange("shed")({ target: { value: "" } })
        }
    }

    const handleGallery = e => {
        setGallery(Object.values(e)[0])
        if (Object.values(e)[0] !== undefined) {
            onChange("galleryName")({ target: { value: Object.values(e)[0] } })
        } else {
            onChange("galleryName")({ target: { value: "" } })
        }
    }

    const handleFloor = e => {
        setFloor(Object.values(e)[0])
        if (Object.values(e)[0] !== undefined) {
            onChange("floor")({ target: { value: Object.values(e)[0] } })
        } else {
            onChange("floor")({ target: { value: "" } })
        }
    }


    const handleSide = e => {
        setSide(Object.values(e)[0])
        if (Object.values(e)[0] !== undefined) {
            onChange("side")({ target: { value: Object.values(e)[0] } })
        } else {
            onChange("side")({ target: { value: "" } })
        }
    }

    const ShedProps = () => {
        const finder = sheds.find(s => s.shed == state?.shed?.value)
        if (finder == undefined) {
            return {}
        }
        return finder
    }

    const GalleryProps = () => {
        if (state?.shed?.value == "GALERIAS") {
            const finder = ShedProps().galleries.find(g => g.name == state?.galleryName?.value)
            if (finder == undefined) {
                return {}
            }
            return finder
        }
        return false
    }

    const handleStallNumber = (e) => {
        setStallNumber(e.target.value)
        if (GalleryProps().stallLetter == true) {
            return onChange("stallNumber")({ target: { value: e.target.value.replace(/[0-9]/g, '') } })
        }
        return onChange("stallNumber")(e)

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
                                standsArray.length === 0 || floor.length === 0 ? "Eligé un piso" : floor
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
                        {state?.floor?.error}
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
                                side.length === 0 ? "Eligé un lado" : side
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
                        {state?.side?.error}
                    </Text>
                </Grid>
            )
        }
    }

    const UseRow = ({row, setRow}) => {
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
                        helperText={state?.row?.error}
                        helperColor="error"
                        status={state?.row?.error ? "error" : "default"}
                        value={row}
                        onChange={(e)=>{
                            setRow(e.target.value)
                            onChange("row")}
                            } 
                            />
                </Grid>
            )
        }

        return null

    }

    const handleButtonAddStand = () => {
        if(!showAddStandButton){
            setShowAddStandButton(true);
            setShed("")
            setGallery("")
            setSide("")
            setFloor("")
            setHallway("")
            setStallNumber("")
            setRow("")
            return;
        }

        setStandsArray([...standsArray, { shed, stallNumber, floor, galleryName: gallery, isInGallery: !!gallery, row, side, hallway }])

        setShed("")
        setGallery("")
        setSide("")
        setFloor("")
        setHallway("")
        setStallNumber("")
        setRow("")
    }



    return (
        <Grid.Container gap={2}>
            {(standsArray.length === 0 || showAddStandButton) &&<>
            <Grid>
                <Text>
                    ¿En que galpón estan?
                </Text>
                <Dropdown>
                    <Dropdown.Button flat color="$gray">
                        {
                            shed.length === 0  ? "Eligé una ubicación" : shed
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
                    {state?.shed?.error}
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
                                standsArray.length === 0 || gallery.length === "" ? "Eligé una ubicación" : gallery
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
            <UseHallway state={state} GalleryProps={GalleryProps} ShedProps={ShedProps} side={side} onChange={onChange} hallway={hallway} setHallway={setHallway} />
            <UseFloor />
            <UseSide />
            <UseRow row={row} setRow={setRow}/>
            <Grid>
                <Text>
                    Numero de puesto
                </Text>
                <Input
                    clearable
                    contentLeft={<Icon id="share_location" />}
                    placeholder="Escribe aqui tu numero de puesto"
                    helperText={state?.stallNumber?.error}
                    helperColor="error"
                    status={state?.stallNumber?.error ? "error" : "default"}
                    value={stallNumber}
                    onChange={handleStallNumber} />
            </Grid>
            </>}
            <Spacer />
            <Grid>
                {
                    data.isPremiun && user.isAdmin &&
                    <Button color="warning" auto ghost onPress={handleButtonAddStand}>
                        Agrega nuevo puesto
                    </Button>
                }
            </Grid>
            <Spacer />
            <Grid.Container gap={2} justify="center">
                <Text>Puestos Vigentes: </Text>
                {
                    standsArray.length > 0 && standsArray.map((stand, i) => (
                        <Grid key={`stand-${i}`}>
                            <Card variant="bordered" key={`stand-card-${i}`}>
                                <Card.Header>
                                    <Text>Galpon: {stand.shed} </Text>
                                </Card.Header>
                                <Card.Body>
                                    <Text> Nº de puesto: {stand.stallNumber}</Text>
                                    {
                                        stand?.row?.length > 0 && <Text>Nº de fila: {stand.row}</Text>
                                    }
                                    {
                                        stand?.hallway?.length > 0 && <Text>Pasillo: {stand.hallway}</Text>
                                    }
                                    {
                                        stand?.side?.length > 0 && <Text>Lado: {stand.side}</Text>
                                    }
                                </Card.Body>
                                <Row justify="flex-end">
                                    <Card.Footer>
                                        <Button size="xs"> X </Button>
                                    </Card.Footer>
                                </Row>
                            </Card>
                            <Spacer />
                        </Grid>

                    )
                    )
                }

            </Grid.Container>



        </Grid.Container>
    )
}

export default SaladaZone