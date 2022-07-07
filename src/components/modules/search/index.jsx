import ProductCard from '../products/cards/normal'
import Fuse from 'fuse.js'
import Input from '@/ui/inputs'
import Select from '@/src/components/ui/selects'
import Card from '../../ui/cards'
import Text from '../../ui/texts'
import Icon from '../../ui/icons'

const SearchModule = ({ data, query }) => {
    return (
        <div className="row">
            <div className="col-3">
                <Card className="my-2 p-3 position-sticky top-1">
                    <Text tag="h3">
                        Filtros
                    </Text>
                    <div className="d-flex flex-row">
                        <Select label="Ordenar por" >
                            <Select.Option value="relevant">Mas relevantes</Select.Option>
                            <Select.Option value="min">Menor precio</Select.Option>
                            <Select.Option value="max">Mayor precio</Select.Option>
                        </Select>
                    </div>
                    
                </Card>
            </div>
            <div className="col-9">
                <Text tag="h2">
                    Resultados para: {query}
                </Text>
                <div className="row">
                    {
                        data.map((product, i) => (
                            <div className="col-3 mb-3" key={i} >
                                <ProductCard data={product} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchModule