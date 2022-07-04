import Icon from "@/src/components/ui/icons"
import Text from "@/ui/texts"
import currency from 'currency.js';

const PriceTable = ({ prices, remove, className }) => (
    <table className={`table table-striped ${className}`}>
        <thead>
            <tr>
                <th scope="col">Cantidad minima</th>
                <th scope="col">Precio x Unid.</th>
                {remove && <th scope="col"></th>}
            </tr>
        </thead>
        <tbody>
            {prices.map((price, priceI) => (
                <tr key={priceI}>
                    <Text tag="th" scope="row">
                        
                        {price.minimun}
                        {(price.isPerDozenElseCurve == undefined) && " unidades"}
                        {price.isPerDozenElseCurve == true && " docenas"}
                        {price.isPerDozenElseCurve == false && " curvas"}
                    </Text>
                    <Text tag="th" >
                        {currency(price.value, { decimal: ",", separator: "." }).format()}
                    </Text>
                    {remove &&
                        <Text tag="th" >
                            <Icon id="delete" className="pointer" onClick={()=>remove(priceI)}/>
                        </Text>
                    }
                </tr>
            ))}
        </tbody>
    </table>
)

export default PriceTable