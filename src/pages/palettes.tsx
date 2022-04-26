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


const PaletteCard = observer(({ palette }: { palette: PaletteChoice }) => {
    const store = useStoreContext();
    const isSelected = store.selectedPalette === palette.value;

    return (
        <Card
            shadow="sm"
            p="sm"
            pb={5}
            withBorder
            sx={(theme) => ({
                background: isSelected ? theme.colors.gray[2] : 'light',
                cursor: store.lockedPalette ? 'default' : 'pointer'
            })}
            onClick={() => {
                if (!store.lockedPalette) {
                    store.setSelectedPalette(palette.value)}
                }
            }
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
                <Text size='sm' sx={(theme) => ({ fontWeight: isSelected ? 800 : 400, userSelect: 'none' })}>{palette.label}</Text>
                <Group noWrap sx={{ gap: 3 }}>
                    {store.lockedPalette && isSelected ? (<Lock size={16} />) : null}
                    {isSelected ? (<Badge color="dark" variant="light">
                        Selected
                    </Badge>) : null}
                </Group>
            </Group>
        </Card>
    )
})

const PalettePage: NextPage = () => {

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
                            {paletteChoices.map(palette => (
                                <PaletteCard palette={palette} key={palette.value} />
                            ))}
                        </SimpleGrid>
                    </Box>
                </Container>
            </AppShell>
        </>
    )
}

export default PalettePage
