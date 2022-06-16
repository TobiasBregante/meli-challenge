import Icon from '@/src/components/ui/icons';
import Text from '@/ui/texts'

const ProductLocation = ({ data }) => {
    return (
        <div className="d-flex flex-column" id="location">
            <Text tag="h3" className="d-flex flex-row p-3">
                <Icon id="pin_drop" className="me-2 mt-01" />
                Ubicación
            </Text>
            <div className="d-flex mb-3 px-3">
                <Text >
                    <Icon id="pin_drop" className="fs-6 mt-01 me-1" />
                    Galpon: {data.location.shed} -
                    Pasillo: {data.location.corridor} -
                    Puesto: {data.location.store}
                </Text>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1159.4462879658258!2d-58.473896519285915!3d-34.72007527521324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcce8617bf524f%3A0x6258fa95738807c1!2sFeria%20Urkupi%C3%B1a!5e0!3m2!1ses-419!2sar!4v1655319062611!5m2!1ses-419!2sar" width="100%" height="500px" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        </div>
    )
}

export default ProductLocation
