import Page from '@Page'
import ProductCarousel from '@/src/components/modules/products/carouseles/product'
import HighLightCarousel from '@/src/components/modules/products/carouseles/highlight'
import { Badge, Button, Card, Col, Container, Grid, Text } from '@nextui-org/react'
import BrandCarousel from '@/src/components/modules/brand/carouseles/brands'
import AdsModals from '@/src/components/modules/products/ads/modals'
import Get from '@/utils/hooks/get'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SelectCountry from '@/src/components/modules/selectCountry'
import ViewedProducts from '@/src/utils/product/viewedProducts'
import BannerSuscriber from '@/src/components/bannerSuscriber'
import CheckoutPro from '@/src/components/payments/checkoutPro'

const Pay = ({ website }) => {
  return (
    <Page categories={website?.categories}>
      <Container xl css={{ mb: "$10", ml: 0, mr: 0 }} className='container-fluid'>
        <CheckoutPro/>
      </Container>
    </Page>
  )
}

export default Pay

export async function getServerSideProps(ctx) {
  return {
    props: {
      website: await Get(`/${ctx?.locale}/website`).then(r => r.data).catch(() => ({}))
    }, // will be passed to the page component as props
  }
}