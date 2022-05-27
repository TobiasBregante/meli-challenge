import {useUserContext} from "@/utils/user/provider"
import Icon from "@/src/components/ui/icons"

const UserAvatar = ()=>{
    return (
        <div className="bg-white rounded-12 d-flex flex-column justify-content-center px-2 pointer">
            <Icon id="person" className="text-dark"/>
        </div>
    )
}

export default UserAvatar