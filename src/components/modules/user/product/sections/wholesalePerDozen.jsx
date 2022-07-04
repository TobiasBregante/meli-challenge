import Input from '@/ui/inputs'
import Icon from '@/ui/icons/'

const WholesalePerDozen = ({ state, handleState }) => {
    return (
        <>
            <Input
                type="number"
                label="Cantidad minima de docenas para envios"
                placeholder="Escribe aqui"
                min={0}
                max={999999}
                iconRight={<Icon id="filter_none" />}
                value={state.minPerDozen}
                onChange={handleState("minPerDozen")}
                clearable />
            <Input
                type="number"
                label="Precio de cada unidad en la docena para ventas por mayor"
                className="mt-2"
                placeholder="Escribe aqui"
                min={0}
                max={999999}
                iconRight={<Icon id="paid" />}
                value={state.pricePerDozen}
                onChange={handleState("pricePerDozen")}
                clearable />
        </>
    )
}
export default WholesalePerDozen