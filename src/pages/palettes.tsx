import type { NextPage } from 'next';
import { AppShell, Badge, Box, Card, Container, Group, ScrollArea, SimpleGrid, Tabs, Text, Title } from '@mantine/core';
import { NextSeo } from 'next-seo';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { PaletteChoice, paletteChoices } from '@/util/palette';
import { observer } from 'mobx-react';
import { useStoreContext } from '@/context/StoreContext';
import { Flame, LayoutGrid, Lock } from 'tabler-icons-react';
import { websiteTitle } from '@/util/seo';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useCallback, useMemo, useRef } from 'react';
import useSize from '@react-hook/size';
import { PaletteCard } from '@/components/PaletteCards';


const TabsContainer: FC<PropsWithChildren<{ palettes: PaletteChoice[], locked: boolean, selected: string | null, onClick: (palette: PaletteChoice) => void }>> = ({ palettes, locked, selected, onClick }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [,height] = useSize(containerRef, { initialWidth: 400, initialHeight: 400 });

    const cards = useMemo(() => palettes.map(p => (
        <PaletteCard
            key={p.value}
            palette={p}
            locked={locked}
            selected={selected === p.value}
            onClick={onClick}
            initialHeight={100}
        />
    )), [locked, palettes, selected, onClick]);

    return (
        <Container fluid sx={{ height: '100%' }} ref={containerRef}>
            <ScrollArea
                style={{ height }}
            >
                <SimpleGrid
                    cols={4}
                    spacing="lg"
                    breakpoints={[
                        { maxWidth: 'md', cols: 3, spacing: 'md' },
                        { maxWidth: 'sm', cols: 2, spacing: 'sm' },
                        { maxWidth: 'xs', cols: 2, spacing: 'sm' },
                    ]}
                >
                    {cards}
                </SimpleGrid>
            </ScrollArea>
        </Container>
    )
}

const PalettePage: NextPage = observer(() => {
    const store = useStoreContext();
    const router = useRouter();

    const locked = store.lockedPalette;
    const selectPalette = store.setSelectedPalette.bind(store);

    const onClick = useCallback((palette: PaletteChoice) => {
        if (!locked) {
            selectPalette(palette.value)
            router.replace('/');
        }
    }, [locked, router, selectPalette]);

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
                styles={(theme) => ({
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
                        styles={(theme) => ({
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
                            <TabsContainer
                                palettes={paletteNice}
                                locked={locked}
                                selected={store.selectedPalette}
                                onClick={onClick}
                            />
                        </Tabs.Tab>
                        <Tabs.Tab label="Brands" icon={<Flame size={14} />}>
                            <TabsContainer
                                palettes={paletteBrands}
                                locked={locked}
                                selected={store.selectedPalette}
                                onClick={onClick}
                            />
                        </Tabs.Tab>
                    </Tabs>
                </Container>
            </AppShell>
        </>
    )
})

export default PalettePage
