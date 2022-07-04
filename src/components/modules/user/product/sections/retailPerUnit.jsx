import Input from '@/ui/inputs'
import Icon from '@/ui/icons/'

const RetailPerUnit = ({state,handleState}) => {
    return (
        <>
            <Input
                type="number"
                label="Cantidad minima de unidades para ventas por menor"
                placeholder="Escribe aqui"
                min={0}
                max={999999}
                iconRight={<Icon id="filter_none" />}
                value={state.minPerUnit}
                onChange={handleState("minPerUnit")}
                clearable />
            <Input
                type="number"
                label="Precio para ventas por menor"
                className="mt-2"
                placeholder="Escribe aqui"
                min={0}
                max={999999}
                iconRight={<Icon id="paid" />}
                value={state.pricePerUnit}
                onChange={handleState("pricePerUnit")}
                clearable /></>
    )
}
export default RetailPerUnit