'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { useApolloClient } from '../lib/apolloClient';
import { store } from '../redux/store';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = useApolloClient();

  return (
    <html lang='en'>
      <head>
        <title>Rick and Morty Dashboard</title>
        <link rel='icon' href='/favicon.png' />
      </head>
      <body className={inter.className}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <div>{children}</div>
          </Provider>
        </ApolloProvider>
      </body>
    </html>
  );
}













