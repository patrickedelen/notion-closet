// import { createGlobalStyle, ThemeProvider } from "styled-components";

import { NextUIProvider, useSSR } from "@nextui-org/react";
import { Component } from "react";
import dynamic from "next/dynamic";
import { SSRProvider } from 'react-aria'
import { Provider } from "react-redux";
import { ThemeProvider } from 'next-themes'
import Header from "@/components/header/Header";
import HeaderCloseBar from "@/components/header/HeaderCloseBar";
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head'

import { wrapper } from '../store/store'


import '../styles/globals.css'

import headerStyles from '@/components/header/Header.module.css'
import cardStyles from '@/components/card/Card.module.css'
import uploadStyles from '@/components/pages/Upload.module.css'
import heroButtonStyles from '@/components/heroButton/HeroButton.module.css'

console.log('loading styles')
console.log(headerStyles)
console.log(cardStyles)
console.log(uploadStyles)


import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'] })

interface ThemeInterface {
  type: string,
  colors: {
    primary: string;
  };
}

const theme: ThemeInterface = {
  type: 'dark',
  colors: {
    primary: "#0070f3",
  },
};


// const NoSSR = ({ children } : { children: any}) => (
//   <>{children}</>
// )

function App({ Component, pageProps, ...rest}: { Component: any, pageProps: any, rest: any }) {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    // <NextThemesProvider value={{ 'dark': theme }}>
    <>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
      <NextUIProvider>
        <Provider store={store}>
          <Header />
          <Component {...pageProps} />
        </Provider>
        <Analytics />
      </NextUIProvider>
    </>
    // </NextThemesProvider>
  );
}

export default App

// export default dynamic(() => Promise.resolve(App), { ssr: false });

// import React from 'react';
// import { AppProps } from 'next/app';
// // import '../styles/global.css'; // Import your global styles here

// import { Outfit } from 'next/font/google'

// const outfit = Outfit({ subsets: ['latin'] }) 

// const MyApp = ({ Component, pageProps }: AppProps) => {
//   return <Component {...pageProps} />;
// };

// export default MyApp;
