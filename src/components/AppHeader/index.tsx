import Link from 'next/link'
import { Header, Title, Image, Stack, Group, ThemeIcon, Text } from "@mantine/core"
import { Book, Palette } from 'tabler-icons-react';
import { latestVersionNum } from '@/util/history';

export const AppHeader = () => {
    return (
        <Header height={70} p="sm" fixed>
            <Stack sx={() => ({ flexDirection: 'row'})} justify='space-between'>
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Image radius={'sm'} src="/icon.png" alt="Logo" width={40} height={40}/>
                    <Link href="/" passHref>
                        <a>
                            <Title
                                ml={10}
                                mt={5}
                                order={1}
                                sx={(theme) => ({
                                    fontWeight: 400,
                                    fontFamily: 'Bebas Neue',
                                    '@media (max-width: 755px)': {
                                        fontSize: theme.spacing.xl
                                    },
                                })}
                            >SVG Artwork Generator</Title>
                        </a>
                    </Link>
                </div>
                <Group>
                    <Text size={'xs'}>Ver: {latestVersionNum}</Text>
                    <Link href="/palettes" passHref>
                        <a>
                            <ThemeIcon size="lg" variant="outline" color="dark">
                                <Palette size={20} />
                            </ThemeIcon>
                        </a>
                    </Link>
                    <Link href="/about" passHref>
                        <a>
                            <ThemeIcon size="lg" variant="outline" color="dark">
                                <Book size={20} />
                            </ThemeIcon>
                        </a>
                    </Link>
                </Group>
            </Stack>
        </Header>
    )
}
