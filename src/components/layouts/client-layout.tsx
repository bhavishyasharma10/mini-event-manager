'use client';

import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo-client';

/**
 * Client Layout
 * 
 * This component provides the ApolloProvider for the client.
 * It uses the ApolloProvider component from the Apollo Client library.
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - The child components to be wrapped
 * @returns {JSX.Element} The rendered layout component
 */
export default function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
} 