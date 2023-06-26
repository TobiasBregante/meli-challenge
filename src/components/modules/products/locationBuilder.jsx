import { Text } from "@nextui-org/react"
import { Fragment } from "react"

const LocationBuilder = ({ data, useFull, ...htmlProps }) => {

    if (data?.zone == "online") {
        return (
            <Fragment>
                <Text {...htmlProps} css={{ mt: 5 }}>
                    Solo venta online
                </Text>
            </Fragment>
        )
    }
    if (data?.zone == "la salada") {
        return (
            <Fragment>
                <Text {...htmlProps}>
                    La salada &nbsp;
                </Text>
                <Text {...htmlProps}>
                    {data?.shed} &nbsp;
                </Text>
                <Text {...htmlProps} >
                    Puesto: {data?.stallNumber} &nbsp;
                </Text>
                {
                    (useFull && data?.floor && data?.floor != "") &&
                    <Text {...htmlProps} >Piso: {data?.floor}&nbsp;</Text>
                }
                {
                    (useFull && data?.hallway && data?.hallway != "") &&
                    <Text {...htmlProps} >pasillo: {data?.hallway}&nbsp;</Text>
                }
                {
                    (useFull && data?.galleryName && data?.galleryName != "") &&
                    <Text {...htmlProps} >Galeria: {data?.galleryName}&nbsp;</Text>
                }
                {
                    (useFull && data?.row && data?.row != "") &&
                    <Text {...htmlProps} >Fila: {data?.row}&nbsp;</Text>
                }
                {
                    (useFull && data?.side && data?.side != "") &&
                    <Text {...htmlProps} >Lado: {data?.side}&nbsp;</Text>
                }
            </Fragment>
        )
    }
    if (data?.zone == "flores") {
        return (
            <Fragment>
                <Text {...htmlProps}>
                    Flores &nbsp;
                </Text>
                {
                    (useFull && data?.galleryName && data?.galleryName != "") &&
                    <Text {...htmlProps} >Galeria: {data?.galleryName}&nbsp;</Text>
                }
                {
                    (useFull && data?.positionInGallery && data?.positionInGallery != "") &&
                    <Text {...htmlProps} >Local N°: {data?.positionInGallery}&nbsp;</Text>
                }
                {
                    (useFull && data?.street && data?.street != "") &&
                    <Text {...htmlProps} >Calle: {data?.street}&nbsp;</Text>
                }
                {
                    (useFull && data?.streetNumber && data?.streetNumber != "") &&
                    <Text {...htmlProps} >Altura{data?.streetNumber}</Text>
                }

            </Fragment>
        )
    }

}

export default LocationBuilder