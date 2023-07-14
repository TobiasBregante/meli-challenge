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
            <Script async src="https://www.facebook.com/tr?id=767524567357286&ev=PageView&noscript=1" />
            <Script
                strategy='afterInteractive'
                id='facebook-ads'
            >
                {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '767524567357286');
                    fbq('track', 'PageView');
        
                    gtag('config', 'G-JD7QXS9TKV');
                `}
            </Script>
            <Script
                strategy='afterInteractive'
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8155864058242383"
                crossorigin="anonymous"
            />
            <NextHead>
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<img height="1" width="1" style="display:none"
                src="https://www.facebook.com/tr?id=767524567357286&ev=PageView&noscript=1"
            />`
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
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round&display=swap" rel="stylesheet" />
            </NextHead>
        </Fragment>
    )
}

Head.defaultProps = {
    title: "SaladaApp",
    description: "Comprá directo a fabricante y mayoristas de la Salada en un solo Click sin intermediarios ni comisiones",
    image: "/logo2.png"
}

export default Head