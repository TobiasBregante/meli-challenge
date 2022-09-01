import '@/styles/build.scss'
import LightTheme from '@/styles/themes/light'
import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider theme={LightTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
