import Text from '@/ui/texts'
import Input from '@/ui/inputs'
import Icon from '@/ui/icons'
import { Fragment } from 'react'

const BrandData = ({state,...htmlProps}) => {
    return (
        <Fragment>
            <Text tag="h4" weight={700}>
                Datos de tu marca
            </Text>
            <Input
                iconRight={<Icon id="storefront" />}
                label="Nombre de tu marca"
                placeholder="Escribe aqui el nombre de tu marca"
                className="mb-4"
                clearable
                value={state.brandname}
                min={3} 
                {...htmlProps}/>
        </Fragment>
    )
}

export default BrandData