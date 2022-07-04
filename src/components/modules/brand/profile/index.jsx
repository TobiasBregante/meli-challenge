import Card from '@/ui/cards'
import Image from 'next/image'
import Text from '@/ui/texts'
import Icon from '@/ui/icons'
import Button from '@/ui/buttons'
import { useState } from 'react'
import Share from '@/components/modules/common/share'
import ProductCard from '@/components/modules/products/cards/normal'
import Select from '@/src/components/ui/selects'
import Input from '@/ui/inputs'
import Fuse from 'fuse.js'

const BrandProfile = ({ data }) => {
    const [isShareOpen, setShareState] = useState(false),
    [content,setContent] = useState(data)


    const handleSortBy = (e)=>{
        
        if (e.target.value == "relevant") {
            const sorted = content.sort((a,b)=>b.rating-a.rating)
            return setContent([...sorted])
        }
        if (e.target.value == "min") {
            const sorted = content.sort((a,b)=>a.price-b.price)
            return setContent([...sorted])
        }
        if (e.target.value == "max") {
            const sorted = content.sort((a,b)=>b.price-a.price)
            return setContent([...sorted])
        }
    }
    const handleLocalSearch = (e)=>{
        if (e.target.value == "") {
            return setContent(data)
        }
        const fuse = new Fuse(content,{keys:["title"],threshold:0.2})
        const search = fuse.search(e.target.value)

        const filtered = content.filter((p,pI)=>search.some(subP=>subP.item.title==p.title))
        console.log(filtered);
        setContent([...filtered])

    }
    return (
        <div className="row">
            <div className="col-12" >
                <Image
                    src="/generic-wallpaper.png"
                    width={1500}
                    height={400}
                    className="rounded-16"
                    alt="" />
            </div>
            <div className="col-12 col-lg-4 mt-1 ">
                <Card rounded={16} className="d-flex flex-column p-3">
                    <Share isVisible={isShareOpen} close={setShareState} />
                    <div className="d-flex flex-row justify-content-center">
                        <Image
                            className="rounded-circle pointer"
                            src={`/img/avatars/3.jpg`}
                            width={100}
                            height={100}
                            alt="als"
                        />
                    </div>
                    <Text tag="h4" className="text-center">
                        Importaciones ambar
                    </Text>
                    <div className="d-flex justify-content-between">
                        <Text weight="800" className="d-flex flex-row">
                            <Icon id="payments" className="me-1" />
                            Metodo de pago:
                        </Text>
                        <Text >
                            Efectivo
                        </Text>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <Text weight="800" className="d-flex flex-row">
                            <Icon id="local_shipping" className="me-1" />
                            Medio de envio:
                        </Text>
                        <Text >
                            flete
                        </Text>
                    </div>
                    <Button color="info-500" className="d-flex flex-row justify-content-center text-white mt-2" onClick={() => setShareState(true)}>
                        Compartir catalogo
                        <Icon id="share" />
                    </Button>
                </Card>
                <Card className="my-2 p-3 position-sticky top-1">
                    <Text tag="h3">
                        Catalogo
                    </Text>
                    <div className="d-flex flex-row">
                        <Select label="Ordenar por" onChange={handleSortBy}>
                            <Select.Option value="relevant">Mas relevantes</Select.Option>
                            <Select.Option value="min">Menor precio</Select.Option>
                            <Select.Option value="max">Mayor precio</Select.Option>
                        </Select>
                    </div>

                    <Input
                        label="Buscar"
                        placeholder="Escribe aqui para buscar entre este catalogo"
                        className="mt-3"
                        icon={<Icon id="search"/>}
                        onChange={handleLocalSearch}
                    />
                </Card>
            </div>

            <div className="col-12 col-lg-8">

                <div className="row">
                    {
                        content.map((product, productI) => (
                            <div key={productI} className="col-6 col-lg-4 p-1">
                                <ProductCard data={product} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BrandProfile