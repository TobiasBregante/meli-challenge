import Get from "@/src/utils/hooks/get"
import { Button, Grid, Text } from "@nextui-org/react"
import { Fragment, useState } from "react"
import OptionGroup from "../auth/signup/assets/optionGroup"
import jsCookie from 'js-cookie'
import Icon from "@/src/components/ui/icons"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const UpdatePremiunPlan = ({data}) => {
    const router = useRouter()
    const [state, setState] = useState({
        date: false,
        plan: false,
    })
    const handleState = (key) => (v) => {
        setState({ ...state, [key]: v })
    }

    const submit = () => {
        if (state.date && state.plan) {
            Get(`/${router?.locale}/user/${data._id}/managePremiun?upgrade=true&plan=${state.plan}&date=${state.date}`, {
                headers: {
                    sldtoken: jsCookie.get("sldtoken")
                }
            })
                .then(res => {
                    router.reload()
                    return toast(res.data.msg)
                })
                .catch(err => {
                    if (err.response) {
                        return toast(err.response.data.msg)
                    }
                    console.error(err);
                    return toast("hubo un error de red al enviar el formulario")
                })
        }
    }

    const downgrade = () => {
        Get(`/${router?.locale}/user/${data._id}/managePremiun?downgrade=true`, {
            headers: {
                sldtoken: jsCookie.get("sldtoken")
            }
        })
            .then(res => {
                router.reload()
                return toast(res.data.msg)
            })
            .catch(err => {
                if (err.response) {
                    return toast(err.response.data.msg)
                }
                console.error(err);
                return toast("hubo un error de red al enviar el formulario")
            })

    }

    const canUpdate = (state.date && state.plan) == false
    return (
        <Fragment>
            <Text h3 weight="normal">
                ¿Hacer premiun por?
            </Text>
            <Grid.Container gap={2}>
                <Grid>
                    <OptionGroup
                        text="1 semana"
                        icon="shopping_cart"
                        isSelected={state.date == "week"}
                        value={"week"}
                        onClick={handleState("date")} />
                </Grid>
                <Grid>
                    <OptionGroup
                        text="1 mes"
                        icon="shopping_cart"
                        isSelected={state.date == "month"}
                        value={"month"}
                        onClick={handleState("date")} />
                </Grid>
                <Grid>
                    <OptionGroup
                        text="1 año"
                        icon="shopping_cart"
                        isSelected={state.date == "year"}
                        value={"year"}
                        onClick={handleState("date")} />
                </Grid>
            </Grid.Container>

            <Text h3 weight="normal">
                ¿Cual plan?
            </Text>
            <Grid.Container gap={2}>
                <Grid>
                    <OptionGroup
                        text="Feriante"
                        icon="storefront"
                        isSelected={state.plan == "feriante"}
                        value={"feriante"}
                        onClick={handleState("plan")} />
                </Grid>
                <Grid>
                    <OptionGroup
                        text="Mayorista"
                        icon="store"
                        isSelected={state.plan == "mayorista"}
                        value={"mayorista"}
                        onClick={handleState("plan")} />
                </Grid>
                <Grid>
                    <OptionGroup
                        text="Galpón"
                        icon="domain"
                        isSelected={state.plan == "galpon"}
                        value={"galpon"}
                        onClick={handleState("plan")} />
                </Grid>
            </Grid.Container>

            <Grid.Container justify="space-between">
                <Button auto color="error" iconRight={<Icon id="arrow_downward" color="white" />} onClick={downgrade} >
                    Sacar Premiun
                </Button>
                <Button auto onClick={submit} iconRight={<Icon id="arrow_upward" color="white" />} disabled={canUpdate}>
                    Actualizar
                </Button>
            </Grid.Container>
        </Fragment>
    )
}

export default UpdatePremiunPlan