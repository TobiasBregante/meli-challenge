import NextHead from 'next/head'

const Head = ({ title, description, image }) => {
    return (
        <NextHead>
            {/* <!-- Google tag (gtag.js) --> */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-5TQSMKBP1Y"/>
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
    
                    gtag('config', 'G-5TQSMKBP1Y');` 
                }}
            />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round&display=swap"
                rel="stylesheet" />
        </NextHead>
    )
}

Head.defaultProps = {
    title: "SaladaApp",
    description: "Comprá directo a fabricante y mayoristas de la Salada en un solo Click sin intermediarios ni comisiones",
    image: "/logo.png"
}

export default Head