import '@/styles/build.scss'
import LightTheme from '@/styles/themes/light'
import { NextUIProvider } from '@nextui-org/react';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <>
    <Script 
          async
          strategy="afterInteractive" 
          data-ad-client="ca-pub-8155864058242383"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8155864058242383"
      />
    <NextUIProvider theme={LightTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
    <Analytics />
    </>
  );
}

export default MyApp;
