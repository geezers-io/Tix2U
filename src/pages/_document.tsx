import { Html, Head, NextScript, Main } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ae9227eb31d38084c5fb2021b9ebbcd6&libraries=services,clusterer"
        ></script>
      </body>
    </Html>
  );
}
