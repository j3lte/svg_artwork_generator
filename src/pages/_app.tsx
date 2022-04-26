import { useState } from 'react';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { MantineProvider } from '@mantine/core';
import { GoogleAnalytics, usePagesViews } from 'nextjs-google-analytics';

import '@/styles/globals.css'

import { StoreProvider } from '@/context/StoreContext';
import { UIProvider } from '@/context/UIContext';
import { ArtStore } from '../store';
import { defaultSeo } from '@/util/seo';

const mainArtStore = new ArtStore();

const App = ({ Component, pageProps }: AppProps ) => {
    usePagesViews();
    const [artStore] = useState(mainArtStore);

    return (
        <>
            <DefaultSeo {...defaultSeo} />
            <GoogleAnalytics />
            <StoreProvider store={artStore}>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        colorScheme: 'light',
                        fontFamily: 'Open Sans',
                    }}
                >
                <UIProvider>
                    <Component {...pageProps} />
                </UIProvider>
                </MantineProvider>
            </StoreProvider>
        </>
    )

}

export default App
