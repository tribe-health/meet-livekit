import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="Tribe Meet | Conference app build with LiveKit and Tribe Core"
        titleTemplate="%s"
        defaultTitle="Tribe Meet | Conference app build with LiveKit and Tribe Core"
        description="Tribe Core and LiveKit are open source projects that give you everything needed to build scalable and real-time audio and/or video experiences in your applications."
        twitter={{
          handle: '@gqadoniscto',
          site: '@gqadoniscto',
          cardType: 'summary_large_image',
        }}
        openGraph={{
          url: 'https://meet.tribecore.io',
          images: [
            {
              url: 'https://meet.livekit.io/images/tribe-meet-open-graph.png',
              width: 1500,
              height: 1000,
              type: 'image/png',
            },
          ],
          site_name: 'Tribe Meet',
        }}
        additionalMetaTags={[
          {
            property: 'theme-color',
            content: '#070707',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
          {
            rel: 'apple-touch-icon',
            href: '/images/livekit-apple-touch.png',
            sizes: '180x180',
          },
          {
            rel: 'mask-icon',
            href: '/images/livekit-safari-pinned-tab.svg',
            color: '#070707',
          },
        ]}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
