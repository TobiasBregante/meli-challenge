import '@/styles/build.scss'
import LightTheme from '@/styles/themes/light'
import { NextUIProvider } from '@nextui-org/react';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <>
    <NextUIProvider theme={LightTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
    <Analytics />
    </>
  );
}

export default MyApp;
