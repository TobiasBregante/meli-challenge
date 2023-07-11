import Page from '@Page'
import { Container, Text, Grid } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { SVGFlag } from 'use-flags'
import Image from "next/legacy/image"

const SelectCountry = () => {
    const router = useRouter()
  
    return (
      <Page hiddeNavbar={true}>
        <Container lg css={{ mb: "$10", ml: 0, mr: 0 }} className='selectCountryPageContain'>
          <Grid.Container gap={1}>
            <Grid.Container direction="row">
              <Grid className="brandingSelectCountry">
                <div>
                  <Image
                    width={50}
                    height={50}
                    src="/logo2.png"
                    objectFit='contain'
                    alt="Salada-app-logo" />
                </div>
                <Text className='brandingTextSelectCountry' h4>
                  <span style={{ display: 'block', marginBottom: -15 }}>
                    Salada App
                  </span>
                </Text>
                <Text h5>
                  Lo Mejor Está Por Llegar
                </Text>
              </Grid>
            </Grid.Container>
            <Grid xs={12} css={{ m: '5% 0 20% 0' }}>
              <Grid.Container gap={1}>
                {router?.locales?.length > 0 && router?.locales?.map(((obj, i) => {
                  return <Grid xs={12} sm={2} md={2} lg={2} xl={2} key={i} className='country-items-select'>
                    <a href={`/${obj}/`}><SVGFlag country={obj} fileType='webp' flagWidth={25} /></a>
                  </Grid>
                }))}
              </Grid.Container>
            </Grid>
          </Grid.Container>
          <div className='shadow' />
        </Container>
      </Page>
    )
  }

  export default SelectCountry