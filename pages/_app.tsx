import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer } from 'react-toastify';
import { updateAxiosInstance } from '../src/axiosConfig';
import { InfoProvider } from '../src/contexts/InfoContext';
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp(props:any) {
  const { Component, pageProps } = props;

  React.useLayoutEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      if (jssStyles.parentElement) jssStyles.parentElement.removeChild(jssStyles);
    }

    updateAxiosInstance();
  }, []);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <InfoProvider>
        <ToastContainer rtl position="bottom-right" />
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </InfoProvider>
    </>
  );
}
