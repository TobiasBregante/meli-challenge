import Card from '@/ui/cards'
import Text from "@/ui/texts";
import Icon from "@/ui/icons";
import { useState } from 'react';
import Input from "@/ui/inputs"
import Button from "@/ui/buttons"
import { useRouter } from 'next/router';
import { useUserContext } from '@/src/utils/user/provider';
import ShouldLogin from '@/components/modules/user/errors/shouldLogin';
import ShouldBeSeller from '@/components/modules/user/errors/shouldBeSeller';
import Select from '@/ui/selects';
import Checkbox from '@/src/components/ui/inputs/checkbox';
import RetailPerUnit from './sections/retailPerUnit';
//Validation
import { toast } from 'react-toastify'
import PriceTable from '@/components/modules/products/view/productInfo/priceTable'
import { FileUploader } from "react-drag-drop-files";
import Image from 'next/image';
import categories from '@/src/utils/user/brand/categories';
import RetailPerDozen from './sections/retailPerDozen';
import WholesalePerUnit from './sections/wholesalePerUnit';
import WholesalePerDozen from './sections/wholesalePerDozen';
import WholesalePerCurve from './sections/wholesalePerCurve';

const AddProduct = () => {

    const router = useRouter()
    const user = useUserContext()



    const [state, setState] = useState({
        title: "",
        category: "",
        stock: "",
        description: "",
        retailPrice: "",
        prices: [],
        imgs: [],
        isPerDozenElseCurve: null,
        minimun: "",
        pricePerUnit: "",
        prices: {
            retail: {
                isPerUnit: null,
                minPerUnit: "",
                pricePerUnit: "",

                minPerDozen: "",
                pricePerDozen: ""
            },
            wholesale: {
                sellMode: null,
                minPerUnit: "",
                pricePerUnit: "",

                minPerDozen: "",
                pricePerDozen: "",

                sizesPerCurve: "",
                minPerCurve:"",
                pricePerCurve: "",
            }
        }
    })

    if (!user) {
        return (
            <ShouldLogin />
        )
    }
    if (!user.isSeller) {
        return (
            <ShouldBeSeller />
        )
    }

    const handleRetailSellMode = v => (e) => {
        setState({
            ...state, prices: {
                ...state.prices,
                retail: {
                    ...state.prices.retail,
                    isPerUnit: v
                }
            }
        })
    }

    const handleRetail = key => (e) => {
        setState({
            ...state, prices: {
                ...state.prices,
                retail: {
                    ...state.prices.retail,
                    [key]: e.target.value
                }
            }
        })
    }

    const handleWholesaleSellMode = v => (e) => {
        setState({
            ...state, prices: {
                ...state.prices,
                wholesale: {
                    ...state.prices.wholesale,
                    sellMode: v
                }
            }
        })
    }

    const handleWholesale = key => (e) => {
        setState({
            ...state, prices: {
                ...state.prices,
                wholesale: {
                    ...state.prices.wholesale,
                    [key]: e.target.value
                }
            }
        })
    }

    const handleGenericString = key => (e) => {
        setState({
            ...state,
            [key]: e.target.value
        })
    }


    const handleSellingMode = (value) => (e) => {

        setState({
            ...state,
            isPerDozenElseCurve: value
        })
    }

    const addPrice = () => {
        if (state.pricePerUnit == "") {
            return toast("Añade un precio antes")
        }
        if (state.minimun == "") {
            return toast("Añade una cantidad minima antes")
        }
        setState({
            ...state,
            prices: [...state.prices, {
                isPerDozenElseCurve: state.isPerDozenElseCurve,
                minimun: state.minimun,
                value: state.pricePerUnit
            }],
            minimun: "",
            pricePerUnit: "",
            isPerDozenElseCurve: null
        })
    }

    const removePrice = (id) => {
        setState({
            ...state,
            prices: state.prices.filter((x, xI) => xI != id)
        })
    }

    const addImg = (e) => {

        const flArray = Array.from(e)

        setState({
            ...state,
            imgs: [...state.imgs, ...flArray.map(img => URL.createObjectURL(img))]
        })
    }
    const removeImg = (id) => () => {
        setState({
            ...state,
            imgs: state.imgs.filter((x, xI) => xI !== id)
        })
    }

    return (
        <div className="container d-flex justify-content-center">
            <Card className="mt-3 col-12 col-lg-7 p-3 mb-5">
                <Text weight={600} tag="h3" className="text-center">
                    Registra un producto
                </Text>
                <Text weight={600} tag="h4" className="d-flex flex-row">
                    <Icon id="info" className={"mt-01"} />
                    Información:
                </Text>
                <Input
                    type="text"
                    label="Titulo del producto"
                    placeholder="Escribe aqui"
                    min={2}
                    max={64}
                    iconRight={<Icon id="title" />}
                    value={state.title}
                    onChange={handleGenericString("title")}
                    clearable />

                <Select className="my-2" label={"Categoria"}>
                    <Select.Option>Elige una categoria</Select.Option>
                    {
                        categories.map((category, i) => (
                            <Select.Option key={i} value={category}>{category}</Select.Option>
                        ))
                    }
                </Select>
                <Text tag="label" className="d-flex flex-row">
                    Descripción:
                </Text>
                <div className="form-floating mb-3">
                    <textarea className="form-control" placeholder="Escriba aqui la descripción" id="description"></textarea>
                    <label htmlFor="description">Escriba aqui siendo lo mas descriptivo posible</label>
                </div>
                <Input
                    type="number"
                    label="Cantidad disponible (stock)"
                    placeholder="Escribe aqui"
                    min={0}
                    max={999999}
                    iconRight={<Icon id="inventory" />}
                    value={state.stock}
                    onChange={handleGenericString("stock")}
                    clearable />

                <Text weight={600} tag="h4" className="d-flex flex-row mt-3">
                    <Icon id="attach_money" className={"mt-01"} />
                    Por menor:
                </Text>
                <div className="d-flex flex-row mb-2">
                    <Checkbox onChange={handleRetailSellMode(true)} checked={state.prices.retail.isPerUnit == true} label="Por unidad" className="me-3" />
                    <Checkbox onChange={handleRetailSellMode(false)} checked={state.prices.retail.isPerUnit == false} label="Por docena" />
                </div>
                {
                    state.prices.retail.isPerUnit &&
                    <RetailPerUnit state={state.prices.retail} handleState={handleRetail} />
                }
                {
                    state.prices.retail.isPerUnit == false &&
                    <RetailPerDozen state={state.prices.retail} handleState={handleRetail} />
                }




                <Text weight={600} tag="h4" className="d-flex flex-row mt-3">
                    <Icon id="attach_money" className={"mt-01"} />
                    Por mayor:
                </Text>
                <div className="d-flex flex-row mb-2">
                    <Checkbox onChange={handleWholesaleSellMode(0)} checked={state.prices.wholesale.sellMode == 0} label="Por unidad" className="me-3" />
                    <Checkbox onChange={handleWholesaleSellMode(1)} checked={state.prices.wholesale.sellMode == 1} label="Por docena" className="me-3" />
                    <Checkbox onChange={handleWholesaleSellMode(2)} checked={state.prices.wholesale.sellMode == 2} label="Por curva" />
                </div>
                {
                    state.prices.wholesale.sellMode == 0 &&
                    <WholesalePerUnit state={state.prices.wholesale} handleState={handleWholesale} />
                }
                {
                    state.prices.wholesale.sellMode == 1 &&
                    <WholesalePerDozen state={state.prices.wholesale} handleState={handleWholesale} />
                }
                {
                    state.prices.wholesale.sellMode == 2 &&
                    <WholesalePerCurve state={state.prices.wholesale} handleState={handleWholesale} />
                }


                <Text weight={600} tag="h4" className="d-flex flex-row mt-3">
                    <Icon id="image" className={"mt-01"} />
                    Imagenes:
                </Text>
                <div className="border-dashed border-2 d-flex flex-column justify-content-center rounded-16 p-3 ">
                    <FileUploader handleChange={addImg} multiple={true} name="file" types={["jpg", "png"]} >
                        <Text>
                            Arrastra y suelta tus fotos aqui
                        </Text>
                    </FileUploader>

                </div>
                <Card className="d-flex flex-row flex-wrap mt-3">
                    {
                        state.imgs.map((img, i) => (
                            <div key={i} className="rounded-12 m-1 position-relative animate__animated animate__bounceIn">
                                <Image
                                    src={img}
                                    width={100}
                                    height={100}
                                    className="rounded-16"
                                    alt="a" />
                                <Icon id="delete" className="position-absolute z-index-infinite right-1 top-1 pointer" onClick={removeImg(i)} />
                            </div>
                        ))
                    }
                </Card>

                <div className="d-flex justify-content-center">
                    <Button color="info-300" className="col-12 col-lg-4 mt-4 d-flex justify-content-center" >
                        <Text weight="700">
                            Cargar producto
                        </Text>
                        <Icon id="add" className="ms-2" />
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default AddProduct