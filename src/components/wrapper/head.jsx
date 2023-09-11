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
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
                <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <meta name="viewport" content="width=device-width, user-scalable=no"/>
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