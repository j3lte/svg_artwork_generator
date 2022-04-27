import type { NextPage } from 'next';
import { AppShell, Badge, Box, Card, Container, Group, SimpleGrid, Text, Title } from '@mantine/core';
import { NextSeo } from 'next-seo';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { PaletteChoice, paletteChoices } from '@/util/palette';
import { observer } from 'mobx-react';
import { useStoreContext } from '@/context/StoreContext';
import { Lock } from 'tabler-icons-react';
import { websiteTitle } from '@/util/seo';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

interface PaletteCardProps {
    palette: PaletteChoice;
    locked: boolean;
    selected: boolean;
    onClick: (palette: PaletteChoice) => void;
}

const PaletteCard = ({ palette, locked, selected, onClick }: PaletteCardProps) => {
    return (
        <Card
            shadow="sm"
            p="sm"
            pb={5}
            withBorder
            sx={(theme) => ({
                background: selected ? theme.colors.gray[2] : 'light',
                cursor: locked ? 'default' : 'pointer'
            })}
            onClickCapture={() => {
                if (!locked) {
                   onClick(palette);
                }
            }}
        >
            <Card.Section>
                <Group noWrap sx={{ gap: 0 }}>
                    {palette.colors.map((c, i) => (
                        <Box
                            key={`${palette.label}_${c}_${i}`}
                            sx={(theme) => ({
                                height: 50,
                                flexGrow: 1,
                                background: c,
                                '@media (max-width: 755px)': {
                                    height: 40
                                },
                            })}
                        />
                    ))}
                </Group>
            </Card.Section>
            <Group position="apart" sx={(theme) => ({ marginBottom: 5, marginTop: theme.spacing.sm })}>
                <Text size='sm' sx={(theme) => ({ fontWeight: selected ? 800 : 400, userSelect: 'none' })}>{palette.label}</Text>
                <Group noWrap sx={{ gap: 3 }}>
                    {locked && selected ? (<Lock size={16} />) : null}
                    {selected ? (<Badge color="dark" variant="light">
                        Selected
                    </Badge>) : null}
                </Group>
            </Group>
        </Card>
    )
}

const PalettePage: NextPage = observer(() => {
    const store = useStoreContext();
    const router = useRouter();

    const locked = store.lockedPalette;
    const selected = store.selectedPalette;
    const selectPalette = store.setSelectedPalette.bind(store);

    const onClick = useCallback((palette: PaletteChoice) => {
        if (!locked) {
            selectPalette(palette.value)
            router.replace('/');
        }
    }, [locked, router, selectPalette]);

    const paletteCards = useMemo(() => paletteChoices.map(palette => (
        <PaletteCard
            palette={palette}
            key={palette.value}
            locked={locked}
            selected={palette.value === selected}
            onClick={onClick}
        />
    )), [locked, onClick, selected])

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
                <Container size={'xl'} sx={{ overflow: 'hidden' }}>
                    <Title order={2}>Available palettes</Title>
                    <Box sx={{ margin: 0 }} pt={10} pb={70}>
                        <SimpleGrid
                            cols={4}
                            spacing="lg"
                            breakpoints={[
                                { maxWidth: 'md', cols: 3, spacing: 'md' },
                                { maxWidth: 'sm', cols: 2, spacing: 'sm' },
                                { maxWidth: 'xs', cols: 2, spacing: 'sm' },
                            ]}
                        >
                            {paletteCards}
                        </SimpleGrid>
                    </Box>
                </Container>
            </AppShell>
        </>
    )
})

export default PalettePage
