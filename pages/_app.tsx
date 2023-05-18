import { createGlobalStyle, ThemeProvider } from "styled-components";

import { NextUIProvider, useSSR } from "@nextui-org/react";
import { Component } from "react";
import dynamic from "next/dynamic";
import { SSRProvider } from 'react-aria'

import '../styles/globals.css'
import headerStyles from '@/components/header/Header.module.css'
import cardStyles from '@/components/card/Card.module.css'

console.log('loading styles')
console.log(headerStyles)
console.log(cardStyles)


import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'] })

interface ThemeInterface {
  colors: {
    primary: string;
  };
}

const theme: ThemeInterface = {
  colors: {
    primary: "#0070f3",
  },
};


// const NoSSR = ({ children } : { children: any}) => (
//   <>{children}</>
// )

export default function App({ Component, pageProps}: { Component: any, pageProps: any }) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

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
