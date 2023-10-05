import NextHead from 'next/head'
import Script from 'next/script'
import { Fragment } from 'react';

const Head = ({ title, description, image }) => {
    return (
        <Fragment>
            {/* <!-- Google tag (gtag.js) --> */}
            < Script strategy='afterInteractive' src="https://www.googletagmanager.com/gtag/js?id=G-5TQSMKBP1Y" />
            <Script
                strategy='afterInteractive'
                id='google-analytics'
            >
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
    
                    gtag('config', 'G-5TQSMKBP1Y');
                `}
            </Script>
            {/* <!-- Google tag (gtag.js) AR --> */}
            <Script strategy='afterInteractive' src="https://www.googletagmanager.com/gtag/js?id=G-VW56X8FG7J" />
            <Script
                onReady={() => {
                    window.dataLayer = window.dataLayer || [];
                    function gtag() { dataLayer.push(arguments); }
                    gtag('js', new Date());

                    gtag('config', 'G-VW56X8FG7J');
                }}
            />
            {/* <!-- Google tag (gtag.js) s/www --> */}
            <Script strategy='afterInteractive' src="https://www.googletagmanager.com/gtag/js?id=G-LED6L9E0MH" />
            <Script
                strategy='afterInteractive'
                id='google-analytics2'
            >
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
        
                    gtag('config', 'G-LED6L9E0MH');
                `}
            </Script>
            {/* <!-- Google tag (gtag.js) AR s/www --> */}
            <Script strategy='afterInteractive' src="https://www.googletagmanager.com/gtag/js?id=G-JD7QXS9TKV" />
            <Script
                strategy='afterInteractive'
                id='google-analytics3'
            >
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
        
                    gtag('config', 'G-JD7QXS9TKV');
                `}
            </Script>
            <NextHead>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <link rel="icon" href="/favicon.ico" sizes="32x32" />
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <meta name="viewport" content="width=device-width, user-scalable=no" />
                <meta name="robots" content="index, follow" />
                <meta name="keywords" content="compras online, supermercado online, productos de almacén, 
                tienda de comestibles en línea, alimentos en línea, comprar comida en línea, abarrotes en 
                línea, compra en el supermercado en línea, entrega de supermercado, comprar comida en 
                línea, mercado online, compra de alimentos en línea, tienda de abarrotes en línea, compra 
                de productos de supermercado, alimentos frescos en línea, comida fresca en línea, comprar 
                comestibles en línea, tienda de supermercado en línea, productos orgánicos en línea, 
                comprar productos de supermercado en línea, compras en el almacén en línea, supermercado 
                virtual, comprar alimentos en línea, entrega de comestibles en línea, supermercado digital, 
                comprar productos frescos en línea, comprar comida fresca en línea, tienda de alimentos en 
                línea, tienda de comestibles en línea, entrega de alimentos en línea, supermercado en línea 
                cercano, productos de supermercado en línea, tienda de comestibles en línea cercana, 
                supermercado en línea con entrega a domicilio, compra de supermercado en línea, productos 
                de supermercado en línea, comestibles en línea cercanos, supermercado en línea más cercano, 
                comprar comestibles en línea cercanos, tiendas de comestibles en línea cercanas, supermercado 
                en línea con envío gratis, comprar alimentos en línea cercanos, entrega de comestibles cercana, 
                compra de alimentos en línea cercana, tienda de comestibles en línea con entrega a domicilio, 
                supermercado en línea barato, productos de supermercado en línea cercanos, comprar productos 
                frescos en línea cercanos, tienda de abarrotes en línea cercana, supermercado en línea con 
                descuento, comprar comestibles en línea con entrega a domicilio, entrega de alimentos en línea 
                cercana, supermercado en línea con ofertas, productos orgánicos en línea cercanos, comprar comida 
                fresca en línea cercanos, comprar alimentos orgánicos en línea, tienda de comestibles en línea con 
                envío gratis, supermercado en línea con cupones, tiendas de comestibles en línea con entrega a 
                domicilio, comprar productos de supermercado en línea cercanos, comprar productos orgánicos en 
                línea cercanos, supermercado en línea de calidad, productos de supermercado en línea con envío a 
                domicilio, tienda de comestibles en línea de calidad, productos de supermercado en línea con 
                descuento, comprar comestibles en línea con descuento, comprar comestibles en línea con cupones, 
                productos de supermercado en línea con ofertas, supermercado en línea con promociones, comprar 
                alimentos en línea con descuento, comprar productos frescos en línea con descuento, tienda de 
                comestibles en línea con descuento, supermercado en línea con productos frescos, productos de 
                supermercado en línea con productos frescos, productos de supermercado en línea de calidad, 
                supermercado en línea con alimentos frescos, comprar productos de supermercado en línea con 
                alimentos frescos, productos de supermercado en línea con envío rápido, comprar comestibles 
                en línea con envío rápido, productos de supermercado en línea con entrega rápida, supermercado 
                en línea con opciones de pago, comprar alimentos en línea con opciones de pago, tienda de 
                comestibles en línea con opciones de pago, supermercado en línea con entrega programada, 
                comprar productos de supermercado en línea con entrega programada, productos de supermercado 
                en línea con entrega flexible, tienda de comestibles en línea con entrega flexible, supermercado 
                en línea con opciones de pago seguras, comprar alimentos en línea con opciones de pago seguras, 
                tienda de comestibles en línea con opciones de pago seguras, supermercado en línea con atención 
                al cliente, comprar productos de supermercado en línea con atención al cliente, productos de 
                supermercado en línea con servicio al cliente, supermercado en línea con devolución de productos, 
                comprar comestibles en línea con devolución de productos, tienda de comestibles en línea con 
                devolución de productos, supermercado en línea con política de devolución, comprar alimentos 
                en línea con política de devolución, tienda de comestibles en línea con política de devolución, 
                supermercado en línea con calidad garantizada, comprar productos de supermercado en línea con 
                calidad garantizada, productos de supermercado en línea con garantía de calidad, tienda de 
                comestibles en línea con garantía de calidad, supermercado en línea con variedad de productos, 
                comprar comestibles en línea con variedad de productos, productos de supermercado en línea con 
                selección amplia, tienda de comestibles en línea con selección amplia, supermercado en línea 
                con opciones de envío, comprar alimentos en línea con opciones de envío, tienda de comestibles 
                en línea con opciones de envío, supermercado en línea con entrega rápida, comprar productos de 
                supermercado en línea con entrega rápida, productos de supermercado en línea con entrega a 
                domicilio garantizada, tienda de comestibles en línea con entrega a domicilio garantizada, 
                supermercado en línea con productos frescos garantizados, comprar alimentos en línea con 
                productos frescos garantizados, tienda de comestibles en línea con productos frescos 
                garantizados, supermercado en línea con selección de marcas, comprar productos de 
                supermercado en línea con selección de marcas, productos de supermercado en línea con 
                marcas de calidad, tienda de comestibles en línea con marcas de calidad, supermercado en 
                línea con ofertas especiales, comprar comestibles en línea con ofertas especiales, productos 
                de supermercado en línea con descuentos especiales, tienda de comestibles en línea con descuentos 
                especiales, supermercado en línea con ofertas exclusivas, comprar alimentos en línea con ofertas 
                exclusivas, tienda de comestibles en línea con ofertas exclusivas, supermercado en línea con 
                membresía, comprar productos de supermercado en línea con membresía, productos de supermercado en 
                línea con beneficios de membresía, tienda de comestibles en línea con beneficios de membresía, 
                supermercado en línea con reseñas de clientes, comprar alimentos en línea con reseñas de clientes, 
                tienda de comestibles en línea con reseñas de clientes, supermercado en línea con recomendaciones 
                de productos, comprar productos de supermercado en línea con recomendaciones de productos, productos 
                de supermercado en línea con mejores valoraciones, tienda de comestibles en línea con mejores 
                valoraciones, supermercado en línea con precios competitivos, comprar comestibles en línea con 
                precios competitivos, productos de supermercado en línea con precios asequibles, tienda de comestibles 
                en línea con precios asequibles, supermercado en línea con opciones de pago flexibles, comprar alimentos 
                en línea con opciones de pago flexibles, tienda de comestibles en línea con opciones de pago flexibles, 
                supermercado en línea con compras seguras, comprar productos de supermercado en línea con compras 
                seguras, productos de supermercado en línea con compras en línea seguras, tienda de comestibles en 
                línea con compras en línea seguras, supermercado en línea con opciones de entrega personalizadas, 
                comprar alimentos en línea con opciones de entrega personalizadas, tienda de comestibles en línea 
                con opciones de entrega personalizadas, supermercado en línea con entrega a domicilio puntual, 
                comprar productos de supermercado en línea con entrega a domicilio puntual, productos de supermercado 
                en línea con entrega a domicilio rápida, tienda de comestibles en línea con entrega a domicilio rápida, 
                supermercado en línea con opciones de entrega flexibles, comprar comestibles en línea con opciones de 
                entrega flexibles, productos de supermercado en línea con entrega a domicilio flexible, tienda de 
                comestibles en línea con entrega a domicilio flexible, supermercado en línea con opciones de pago 
                convenientes, comprar alimentos en línea con opciones de pago convenientes, tienda de comestibles en 
                línea con opciones de pago convenientes, supermercado en línea con productos frescos y saludables, 
                comprar productos de supermercado en línea con productos frescos y saludables, productos de supermercado 
                en línea con opciones de comida saludable, tienda de comestibles en línea con opciones de comida saludable, 
                supermercado en línea con alimentos orgánicos, comprar comestibles en línea con alimentos orgánicos, productos 
                de supermercado en línea con opciones de alimentos naturales, tienda de comestibles en línea con opciones de 
                alimentos naturales, supermercado en línea con opciones de comida fresca, comprar alimentos en línea con opciones 
                de comida fresca, tienda de comestibles en línea con opciones de comida fresca, supermercado en línea con opciones 
                de comida gourmet, comprar productos de supermercado en línea con opciones de comida gourmet, productos de 
                supermercado en línea con opciones de comida internacional, tienda de comestibles en línea con opciones de comida 
                internacional, supermercado en línea con opciones de comida étnica, comprar comestibles en línea con opciones de 
                comida étnica, tienda de comestibles en línea con opciones de comida étnica, supermercado en línea con opciones de 
                comida vegetariana, comprar alimentos en línea con opciones de comida vegetariana, productos de supermercado en 
                línea con opciones de comida vegana, tienda de comestibles en línea con opciones de comida vegana, 
                supermercado en línea con opciones de comida sin gluten, comprar comestibles en línea con opciones de 
                comida sin gluten, tienda de comestibles en línea con opciones de comida sin lactosa, supermercado en 
                línea con opciones de comida sin azúcar, comprar productos de supermercado en línea con opciones de comida 
                sin azúcar, productos de supermercado en línea con opciones de comida baja en grasa, tienda de comestibles 
                en línea con opciones de comida baja en grasa, supermercado en línea con opciones de comida baja en calorías, 
                comprar alimentos en línea con opciones de comida baja en calorías, tienda de comestibles en línea con 
                opciones de comida baja en sodio, supermercado en línea con opciones de comida baja en sodio, comprar 
                comestibles en línea con opciones de comida baja en carbohidratos, productos de supermercado en línea con 
                opciones de comida baja en carbohidratos, tienda de comestibles en línea con opciones de comida alta en 
                proteínas, supermercado en línea con opciones de comida alta en fibra, comprar alimentos en línea con 
                opciones de comida alta en fibra, productos de supermercado en línea con opciones de comida para dietas 
                especiales, tienda de comestibles en línea con opciones de comida para alergias, supermercado en línea 
                con opciones de comida para intolerancias, comprar comestibles en línea con opciones de comida para dietas 
                específicas, tienda de comestibles en línea con opciones de comida para dietas de moda, supermercado en 
                línea con opciones de comida para dietas de moda, comprar alimentos en línea con opciones de comida para 
                dietas de moda, productos de supermercado en línea con opciones de comida para dietas populares, tienda 
                de comestibles en línea con opciones de comida para dietas populares, supermercado en línea con opciones 
                de comida para dietas de moda, comprar comestibles en línea con opciones de comida para dietas de moda, 
                tienda de comestibles en línea con opciones de comida para dietas de tendencia, supermercado en línea 
                con opciones de comida para dietas de tendencia, comprar alimentos en línea con opciones de comida para 
                dietas de tendencia, productos de supermercado en línea con opciones de comida para dietas saludables, 
                tienda de comestibles en línea con opciones de comida para dietas saludables, supermercado en línea con 
                opciones de comida para dietas equilibradas, comprar comestibles en línea con opciones de comida para 
                dietas equilibradas, productos de supermercado en línea con opciones de comida para dietas equilibradas, 
                tienda de comestibles en línea con opciones de comida para dietas equilibradas, supermercado en línea con 
                opciones de comida para una vida activa, comprar alimentos en línea con opciones de comida para una vida 
                activa, productos de supermercado en línea con opciones de comida para una vida activa, tienda de 
                comestibles en línea con opciones de comida para una vida activa, supermercado en línea con opciones de 
                comida para una vida saludable, comprar comestibles en línea con opciones de comida para una vida saludable, 
                productos de supermercado en línea con opciones de comida para una vida saludable, tienda de comestibles en 
                línea con opciones de comida para una vida saludable, supermercado en línea con opciones de comida para una 
                vida saludable y activa, comprar alimentos en línea con opciones de comida para una vida saludable y activa, 
                productos de supermercado en línea con opciones de comida para una vida saludable y activa, tienda de 
                comestibles en línea con opciones de comida para una vida saludable y activa"/>
            </NextHead>
        </Fragment>
    )
}

Head.defaultProps = {
    title: "Iwarket",
    description: `Comprá en un solo Click al mejor precio.`,
    image: "/mobile/ms-icon-310x310.png"
}

export default Head