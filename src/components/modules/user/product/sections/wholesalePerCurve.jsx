import Input from '@/ui/inputs'
import Icon from '@/ui/icons/'

const WholesalePerDozen = ({ state, handleState }) => {
    return (
        <>
            <Input
                type="number"
                label="Cantidad de talles que tiene una curva"
                placeholder="Escribe aqui"
                min={0}
                max={999999}
                iconRight={<Icon id="filter_none" />}
                value={state.sizesPerCurve}
                onChange={handleState("sizesPerCurve")}
                clearable />
            <Input
                type="number"
                label="Cantidad minima de docenas para envios"
                placeholder="Escribe aqui"
                min={0}
                max={999999}
                iconRight={<Icon id="filter_none" />}
                value={state.minPerCurve}
                onChange={handleState("minPerCurve")}
                clearable />
            <Input
                type="number"
                label="Precio de cada unidad en la docena para ventas por mayor"
                className="mt-2"
                placeholder="Escribe aqui"
                min={0}
                max={999999}
                iconRight={<Icon id="paid" />}
                value={state.pricePerCurve}
                onChange={handleState("pricePerCurve")}
                clearable />
        </>
    )
}
export default WholesalePerDozen