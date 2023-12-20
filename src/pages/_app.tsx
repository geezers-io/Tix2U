import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import ErrorBoundary from '@/components/ErrorBoundary.tsx';
import PageAside from '@/components/layouts/PageAside.tsx';
import PageHeader from '@/components/layouts/PageHeader.tsx';
import SupabaseProvider from '@/providers/SupabaseProvider.tsx';
import theme from '@/styles/theme';

const queryClient = new QueryClient();

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tix2U</title>
      </Head>

      <ErrorBoundary>
        <ChakraProvider theme={theme}>
          <SupabaseProvider>
            <QueryClientProvider client={queryClient}>
              <PageHeader />
              <Component {...pageProps} />
              <PageAside />
            </QueryClientProvider>
          </SupabaseProvider>
        </ChakraProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
