import type { AppProps } from 'next/app';
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from 'react-redux';

import { useStore } from '../store';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <NextUIProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </NextUIProvider>
  );
}

export default MyApp;
