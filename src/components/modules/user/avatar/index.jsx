import { useUserContext } from "@/utils/user/provider"
import Icon from "@/src/components/ui/icons"
import PopOver from '@/ui/popovers'
import Card from "@/ui/cards";
import Button from '@/ui/buttons';
import { useState } from "react";

const UserAvatar = () => {
    const [isOpen, setOpen] = useState(false)


    const ListItem = ({ icon, text, ...htmlProps }) => {
        return (
            <a className="list-group-item list-group-item-action border-0 rounded-12 my-1 d-flex pointer" 
            {...htmlProps}>
                {icon && <Icon id={icon} className="me-1" />}
                {text}
            </a>
        )
    }
    return (

        <PopOver isOpen={isOpen} content={
            <Card className="p-2 mt-1 shadow">
                <div className="list-group border-0">
                    <ListItem icon="person" text="Mi perfil" />
                    {
                        !useUserContext().isSeller &&
                        <>
                        <ListItem icon="subscriptions" text="Suscripción" />
                        <ListItem icon="store" text="Mis puestos" />
                        <ListItem icon="add_business" text="Reclamar puesto" />
                        </>
                    }
                    <ListItem icon="support_agent" text="Servicio al cliente" />
                    <ListItem icon="logout" text="Cerrar sesión"  />
                </div>
            </Card>
        }>
            <Button color="white" className="px-2" onClick={() => setOpen(!isOpen)}>
                <Icon id="person" className="text-dark" />
            </Button>
        </PopOver>
    )
}

export default UserAvatar