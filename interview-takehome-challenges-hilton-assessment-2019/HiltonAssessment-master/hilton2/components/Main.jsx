import React from 'react';
import Head from 'next/head'
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import GlobalStyle from '../styles/GlobalStyle';
import ErrorBoundary from './ErrorBoundary';
import Form from './Form';

function Main() {
  return (
    <>
      <Head>
        <title>Hilton Assessment (II)</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={defaultTheme}>
        <ErrorBoundary>
          <Form />
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
}

export default Main;
