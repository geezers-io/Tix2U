import { Html, Head, NextScript, Main } from 'next/document';
import PageAside from '@/components/layouts/PageAside.tsx';
import PageHeader from '@/components/layouts/PageHeader.tsx';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <PageHeader />

        <Main />

        <PageAside />

        <NextScript />
      </body>
    </Html>
  );
}
