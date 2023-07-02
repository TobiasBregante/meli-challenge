import Image from 'next/image'
import Icon from '@/ui/icons'
import Share from '@/components/modules/common/share'
import { Button, Card, Grid, Text } from '@nextui-org/react'
import Router, { useRouter } from 'next/router'
import { useUserContext } from '@/src/utils/user/provider';
import { useEffect, useState } from 'react'
import Link from '@/src/utils/hooks/Link'

const showUploadWidget = () => { 
    cloudinary.openUploadWidget({ 
        cloudName: "saladapp", 
        // uploadPreset: "<upload preset>", 
        sources: [
            "local", 
            "url", 
            "camera", 
            "image_search", 
            "google_drive", 
            "facebook", 
            "dropbox", 
            "instagram", 
            "shutterstock", 
            "getty", 
            "istock", 
            "unsplash"
        ], 
        googleApiKey: "<image_search_google_api_key>", 
        showAdvancedOptions: true, 
        cropping: true, 
        multiple: false, 
        defaultSource: "local", 
        styles: { 
            palette: { 
                window: "#FFFFFF", 
                windowBorder: "#90A0B3", 
                tabIcon: "#0078FF", 
                menuIcons: "#5A616A", 
                textDark: "#000000", 
                textLight: "#FFFFFF", 
                link: "#0078FF", 
                action: "#FF620C", 
                inactiveTabIcon: "#0E2F5A", 
                error: "#F44235", 
                inProgress: "#0078FF", 
                complete: "#20B832", 
                sourceBg: "#E4EBF1" 
            }, 
            fonts: { 
                default: { 
                    active: true 
                } 
            } 
        } 
    }, (err, info) => { 
        if (!err) { 
            console.log("Upload Widget event - ", info); 
        } 
    }); 
}

const BrandProfileMinimal = ({ data, hideFullProfile }) => {
    const user = useUserContext()
    const [isAdmin, setIsAdmin] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsAdmin(user?._id === data?.isOwnedBy) 
    }, [user, data])

    const redirectToUpdateProfile = () => Router?.push(`/./${router?.locale}/brand/update/${data?._id}`)
    
    return (
        <Card rounded={16} className="d-flex flex-column p-3 brand-card">
            <Card.Body>
                {
                    isAdmin && (
                        <Grid.Container>
                            <Button className='btnProfileEdit' size={'xs'} color='default' onClick={redirectToUpdateProfile}
                                icon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={'30%'}
                                        height={'30%'}
                                        fill="currentColor"
                                        className="bi bi-pencil"
                                        viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                    </svg>
                                }
                            />
                        </Grid.Container>
                    )
                }
                <Grid.Container justify="center">
                    <div>
                        <Image
                            className="bg-image rounded-circle pointer"
                            src={data.imgs?.principal !== undefined && data?.imgs?.principal !== 'NI35_W3jmftQURiB_rR_LR0IUkjGXl77' ? data.imgs.principal : "blank-profile-picture-g227b26ec4_640_fwvqox"}
                            width={100}
                            height={100}
                            layout='intrinsic'
                            objectFit='contain'
                            alt="als"
                        />
                    </div>
                </Grid.Container>
               <Grid>
                <Text h2>
                        <span style={{
                            color: '#000',
                            fontSize: 14,
                            letterSpacing: 1.4,
                            padding: 9,
                            borderRadius: 8,
                            backgroundColor: 'rgba(255, 255, 255, .5)'
                        }}>
                            {data.brandName}
                        </span>
                    </Text>
               </Grid>
                {
                    (hideFullProfile == false || hideFullProfile == undefined) &&
                    <Link href={`/brand/${data._id}`}>
                        <Button color="secondary" auto icon={<Icon id="open_in_new" color="white" />} css={{ mb: 10 }}>
                            Catálogo
                        </Button>
                    </Link>
                }
                <Share link={`/brand/${data._id}`}/>
                <div className="circle"/>
                <div className="circle-2"/>
            </Card.Body>
        </Card>
    )
}

export default BrandProfileMinimal