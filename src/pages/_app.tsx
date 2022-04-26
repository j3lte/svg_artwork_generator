import { useState } from 'react';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core';

import { StoreProvider } from '@/context/StoreContext';
import { UIProvider } from '@/context/UIContext';
import { ArtStore } from '../store';
import { defaultSeo } from '@/data/seo';

const mainArtStore = new ArtStore();

const App = ({ Component, pageProps }: AppProps ) => {
    const [artStore] = useState(mainArtStore);

    return (
        <>
            <DefaultSeo {...defaultSeo} />

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
