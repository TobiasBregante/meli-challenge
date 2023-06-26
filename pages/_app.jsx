import '@/styles/build.scss'
import LightTheme from '@/styles/themes/light'
import { NextUIProvider } from '@nextui-org/react';
import { Analytics } from '@vercel/analytics/react';
import { Fragment } from 'react';

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <Fragment>
      <NextUIProvider theme={LightTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
      <Analytics />
    </Fragment>
  );
}

export default MyApp;
