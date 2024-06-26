import categories from "@/src/utils/user/brand/categories"
import { Dropdown, Grid, Text } from "@nextui-org/react"
import { Fragment, useState } from "react"

const Clasification = ({state,onChange}) => {
    const [categoryState, setCategory] = useState("")

    const handleCategory = e => {
        setCategory(e)
        if (Object.values(e)[0] !== undefined) {
            onChange("category")({ target: { value: Object.values(e)[0] } })
        } else {
            onChange("category")({ target: { value: "" } })
        }

    }
    return (
        <Fragment>
            <Grid>
                <Text>
                    Categoria
                </Text>
                <Dropdown>
                    <Dropdown.Button flat color="$gray">
                        {
                            state.category.value.length == 0 ? "Eligé una categoria" : state.category.value
                        }
                    </Dropdown.Button>
                    <Dropdown.Menu
                        selectionMode="single"
                        selectedKeys={categoryState}
                        onSelectionChange={handleCategory}
                    >
                        {
                            categories.map((category, i) => (
                                <Dropdown.Item key={category.name}>{category.name}</Dropdown.Item>
                            ))
                        }
                    </Dropdown.Menu>

                </Dropdown>
                <Text small color="error">
                    {state.category.error}
                </Text>
            </Grid>
        </Fragment>
    )
}

export default Clasification