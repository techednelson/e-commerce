import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';

const queryClient = new QueryClient();

const CustomApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Head>
      <title>Welcome to e-commerce!</title>
    </Head>
    <main className="app">
      <Component {...pageProps} />
    </main>
  </QueryClientProvider>
);

export default CustomApp;
