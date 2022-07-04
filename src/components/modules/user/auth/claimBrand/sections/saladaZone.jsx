import Input from "@/ui/inputs"
import Select from '@/ui/selects';
import Icon from '@/ui/icons'

const SaladaZone = ({ state, onChange }) => {
    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-row flex-wrap">
                <div className="me-3 mb-2">
                    <Select label="¿En que galpón se encuentra tu puesto?" value={state.shed} onChange={onChange("shed")}>
                        <Select.Option value="">Elige una opción</Select.Option>
                        <Select.Option value="punta mogote">Punta mogote</Select.Option>
                        <Select.Option value="urkupiña">Urkupiña</Select.Option>
                        <Select.Option value="los coreanos">Los koreanos</Select.Option>
                        <Select.Option value="oceans">Oceans</Select.Option>
                        <Select.Option value="galerias">Galerias</Select.Option>
                    </Select>
                </div>
                <div>
                    <Input
                        label="Numero de puesto"
                        placeholder="Escribe aqui tu numero de puesto"
                        value={state.stallNumber}
                        onChange={onChange("stallNumber")}
                        iconRight={<Icon id="share_location" />}
                        clearable />
                </div>
            </div>
            <div className="d-flex mt-3">
                <Input
                type="number"
                    label="Numero de pasillo"
                    placeholder="Escribe aqui tu numero de pasillo"
                    className="me-2"
                    value={state.hallwayNumber}
                    onChange={onChange("hallwayNumber")}
                    iconRight={<Icon id="share_location" />}
                    clearable />
                {
                    state.shed == "urkupiña" &&
                    <Input type="number"
                        label="Numero de fila"
                        placeholder="Escribe aqui tu numero de fila"
                        value={state.rowNumber}
                        onChange={onChange("rowNumber")}
                        iconRight={<Icon id="share_location" />}
                        clearable />
                }
            </div>
        </div>
    )
}

export default SaladaZone