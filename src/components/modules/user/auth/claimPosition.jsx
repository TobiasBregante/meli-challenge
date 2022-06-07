import Card from '@/ui/cards'
import Text from "@/ui/texts";
import Icon from "@/ui/icons";
import { useState } from 'react';
import Input from "@/ui/inputs"
import InputPassword from "@/ui/inputs/password"
import Button from "@/ui/buttons"
import Link from 'next/link';
import { toast } from 'react-toastify';
import Post from '@/utils/hooks/post'
import Joi from 'joi'
import jsCookie from 'js-cookie'
import {useRouter} from 'next/router';
import { useUserContext } from '@/src/utils/user/provider';
import ShouldLogin from '@/components/modules/user/errors/shouldLogin';
import ShouldBeSeller from '@/components/modules/user/errors/shouldBeSeller';
import Select from '@/ui/selects';

const ClaimPositionModule = () => {

    const router = useRouter()
    const user = useUserContext()

    const [state, setState] = useState({
        email: "",
        password: "",
    })
    const handleInput = (key) => (e) => {
        setState({ ...state, [key]: e.target.value.trim() })
    }


    const submit = () => {
        const Schema = Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).required(),
            password: Joi.string().min(6).required()
        })

        const { error } = Schema.validate(state)
        if (error) {
            console.error(error);
            return toast("Completa todos los campos")
        }

        if (!error) {
            Post("user/auth/signin", {
                email: state.email,
                password: state.password
            })
                .then(res => {
                    toast(res.data.msg)
                    jsCookie.set("sldtoken", res.data.sldtoken)
                    if(router.query.redirect){
                        return router.push(`/.${router.query.redirect}`)
                    }
                    return router.push(`/./`)
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

    if (!user) {
        return (
            <ShouldLogin/>
        )
    }
    if (!user.isSeller) {
        return (
            <ShouldBeSeller/>
        )
    }

    return (
        <div className="container d-flex justify-content-center">
            <Card className="mt-3 col-12 col-lg-8 p-3 mb-5">
                <Text weight={600} tag="h3" className="text-center">
                    Reclamar puesto
                </Text>
                <select className="border-0 outline-none rounded-8" name="location">
                    <option>
                        caho
                    </option>
                </select>
            </Card>
        </div>
    )
}

export default ClaimPositionModule