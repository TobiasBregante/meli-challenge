import Icon from "@/src/components/ui/icons"
import { useUserContext } from "@/src/utils/user/provider"
import { Button, Grid, Text } from "@nextui-org/react"
import Image from "next/legacy/image"

const UserChatHeader = ({ data }) => {
    let headerData = data.user
    const user = useUserContext()
    
    if (data.user._id == user._id) {
        headerData = {
            name: data.brand.brandName,
            img: data.brand.img
        }
    }


    return (
        <Grid.Container justify="space-between">
            <Grid>
                <Grid.Container>
                    <Grid css={{ mr: 10 }}>
                        <Button auto icon={<Icon id="arrow_back" />} css={{ bg: "$white" }}>

                        </Button>
                    </Grid>
                    <Grid css={{ mr: 10 }}>
                        <div>
                            <Image
                                src={`/img/${headerData.img}.jpg`}
                                width={50}
                                height={50}
                                alt="bg"
                                className="rounded-circle " />
                        </div>
                    </Grid>
                    <Grid>
                        <Text h2>
                            {
                                headerData.name
                            }
                        </Text>
                    </Grid>
                </Grid.Container>
            </Grid>
            <Grid>
                <Button css={{ bg: "$whatsapp" }} auto >
                    Contactar al Whatsapp
                </Button>
            </Grid>
        </Grid.Container>
    )
}

export default UserChatHeader