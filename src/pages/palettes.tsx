import type { NextPage } from 'next';
import { AppShell, Container, Tabs, Title } from '@mantine/core';
import { NextSeo } from 'next-seo';
import { observer } from 'mobx-react';
import { Flame, LayoutGrid } from 'tabler-icons-react';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { PaletteChoice, paletteChoices } from '@/util/palette';
import { useStoreContext } from '@/context/StoreContext';
import { websiteTitle } from '@/util/seo';
import { useUIContext } from '@/context/UIContext';
import { PaletteTabsContainer } from '@/components/PaletteTabsContainer';

const PalettePage: NextPage = observer(() => {
    const store = useStoreContext();
    const ui = useUIContext();
    const router = useRouter();

    const selectPalette = store.setSelectedPalette.bind(store);

    const onClick = useCallback((palette: PaletteChoice) => {
        selectPalette(palette.value)
        router.push('/');
    }, [router, selectPalette]);

    const paletteNice = useMemo(() => paletteChoices.filter(p => p.group === 'Nice'), []);
    const paletteBrands = useMemo(() => paletteChoices.filter(p => p.group === 'Brand'), []);

    return (
        <>
            <NextSeo
                title={`Palettes | ${websiteTitle}`}
            />
            <AppShell
                padding={'sm'}
                header={<AppHeader />}
                footer={<AppFooter />}
                styles={() => ({
                    body: {
                        paddingTop: 70,
                        paddingBottom: 60,
                        height: '100vh'
                    }
                })}
            >
                <Container size={'xl'} sx={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Title order={2} sx={{ flex: '0 1 auto' }}>Palettes</Title>
                    <Tabs
                        color="dark"
                        active={ui.activePaletteTab}
                        onTabChange={ui.setActivePaletteTab}
                        styles={() => ({
                            root: {
                                display: 'flex', flexDirection: 'column', flex: '1 1 auto'
                            },
                            tabsListWrapper: {
                                flex: '0 1 auto'
                            },
                            body: {
                                flex: '1 1 auto'
                            }

                        })}
                    >
                        <Tabs.Tab label="Nice" icon={<LayoutGrid size={14} />}>
                            <PaletteTabsContainer
                                palettes={paletteNice}
                                selected={store.selectedPalette}
                                onClick={onClick}
                                tabID={0}
                                maxTabID={1}
                            />
                        </Tabs.Tab>
                        <Tabs.Tab label="Brands" icon={<Flame size={14} />}>
                            <PaletteTabsContainer
                                palettes={paletteBrands}
                                selected={store.selectedPalette}
                                onClick={onClick}
                                tabID={1}
                                maxTabID={1}
                            />
                        </Tabs.Tab>
                    </Tabs>
                </Container>
            </AppShell>
        </>
    )
})

export default PalettePage
