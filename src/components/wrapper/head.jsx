import NextHead from 'next/head'

const Head = ({ title, description, image }) => {
    return (
        <NextHead>
            <title>{title}</title>
            <meta name="description" content={description} />


            <link rel="canonical" href="https://comamosramen.com" />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
        </NextHead>
    )
}

Head.defaultProps = {
    title:"SaladaApp",
    description:"Comprá directo a fabricante y mayoristas de la Salada en un solo Click sin intermediarios ni comisiones",
    image:"/logo.png"
}

export default Head