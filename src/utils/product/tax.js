const withTax = (arr, openProduct) => {
    const fee = 28;
    const IVA = 21;
    const MercadoPagoPFee = 6.99;
    const dollar = 1100;
    const taxes = fee + MercadoPagoPFee;
    const currentDollar = 1500;
    const priceWithoutTaxes = arr?.prices?.retail;

    if (arr?.prices) {
        arr.prices = {
            ...{ withoutTaxes: priceWithoutTaxes },
            ...arr?.prices,

        } 
    }
    if (openProduct) {
        if (arr?.prices?.retail) {
            arr.prices.retail = ((arr?.prices?.retail + ((arr?.prices?.retail * taxes) / 100)) / dollar) * currentDollar
        }
        return arr
    }

    arr?.length > 0 ? arr?.map(product => {
        if (product?.prices?.retail) {
            product.prices.retail = ((product?.prices?.retail + ((product?.prices?.retail * taxes) / 100)) / dollar) * currentDollar
        }

        return product
    })
        : arr

    return arr
}

export default withTax