import Input from "@/ui/inputs"
import Icon from "@/ui/icons"
import Checkbox from '@/ui/inputs/checkbox'

const SaladaZone = ({ state, onChange }) => {
    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-row mb-2">
                <Checkbox 
                label="¿El local esta en una galería?" 
                checked={state.isInGallery}
                onChange={onChange("isInGallery")}/>
            </div>
            {
                state.isInGallery &&
                <div className="d-flex flex-row flex-wrap mb-2">
                    <div className="me-2 mb-2">
                        <Input
                            label="Nombre de la galeria"
                            placeholder="Escribe aqui el nombre de la galeria"
                            value={state.galleryName}
                            onChange={onChange("galleryName")}
                            iconRight={<Icon id="store"/>}
                            clearable
                        />
                    </div>
                    <div>
                        <Input
                            label="Numero en la galeria"
                            placeholder="Escribe aqui el nombre de la galeria"
                            value={state.positionInGallery}
                            onChange={onChange("positionInGallery")}
                            iconRight={<Icon id="share_location"/>}
                            clearable />
                    </div>
                </div>
            }
            <div className="d-flex flex-row flex-wrap">
                <div className="me-2 mb-2">
                    <Input
                        label="Calle"
                        placeholder="Escribe aqui la calle"
                        value={state.street}
                        onChange={onChange("street")}
                        iconRight={<Icon id="share_location"/>}
                        clearable
                    />
                </div>
                <div>
                    <Input
                        type="number"
                        label="Altura de la calle"
                        placeholder="Escribe aqui la altura de la calle"
                        value={state.streetNumber}
                        onChange={onChange("streetNumber")}
                        iconRight={<Icon id="share_location"/>}
                        clearable />
                </div>
            </div>
        </div>
    )
}

export default SaladaZone