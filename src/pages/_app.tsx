import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core';

import { StoreProvider } from '@/context/StoreContext';
import { UIProvider } from '@/context/UIContext';
import { ArtStore } from '../store';
import { LoadingScreen } from '@/components/Loading';
import { useDebouncedCallback } from 'beautiful-react-hooks';

const mainArtStore = new ArtStore();

const App = ({ Component, pageProps }: AppProps ) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [artStore] = useState(mainArtStore);

    const debouncedLoader = useDebouncedCallback((state: boolean) => {
        setLoading(state);
    }, undefined, 750);

    useEffect(() => {
        const handleStart = (url: string) => {
            debouncedLoader(url !== router.pathname);
        };
        const handleComplete = (url: string) => debouncedLoader(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);
    }, [router, debouncedLoader]);

    return (
        <>
            <Head>
                <title>Art Blocks Generator</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>

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
                    {/* <LoadingScreen loading={loading} /> */}
                    <Component {...pageProps} />
                </UIProvider>
                </MantineProvider>
            </StoreProvider>
        </>
    )

}

export default App
