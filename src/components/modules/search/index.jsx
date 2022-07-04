import ProductCarousel from "../products/carousel"
import data from '@/utils/sampleProducts'
import Fuse from 'fuse.js'
import Input from '@/ui/inputs'
import Select from '@/src/components/ui/selects'

const SearchModule = () => {
    const fuse = new Fuse(content, { keys: ["title"], threshold: 0.4 })
    const search = fuse.search(e.target.value)

    return (
        <div className="container pt-3">
            <ProductCarousel title="Productos recien ingresados" data={data} />
        </div>
    )
}

export default SearchModule