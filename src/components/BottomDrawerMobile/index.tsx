import { useUIContext } from "@/context/UIContext"
import { Drawer, ScrollArea, Affix, MediaQuery, Button, Group, ThemeIcon, Box } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import Link from "next/link"
import { ArrowDown, Palette, Settings } from "tabler-icons-react"
import { Options } from "../Options"

export const BottomDrawerMobile = () => {
    const { drawerOpened, setDrawerOpened } = useUIContext();
    const xsScreen = useMediaQuery('(max-width: 900px)');

    return (
        <>
            <Drawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                padding="sm"
                size="50%"
                position='bottom'
            >
                <ScrollArea sx={() => ({ height: `100%`, paddingBottom: 50 })}>
                    <Options  />
                    <Box>
                        <Group
                            sx={(theme) => ({
                                height: 50, color: theme.colors.gray[1],
                                width: '100%',
                                alignContent: 'center',
                                justifyContent: 'center'
                            })}
                            onClickCapture={() => setDrawerOpened(false)}
                        >
                            <ArrowDown  />
                        </Group>
                    </Box>
                </ScrollArea>
            </Drawer>
            <Affix position={xsScreen ? { bottom: 16, left: 12 } : { bottom: 12, left: 12 }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Group noWrap sx={{ gap: 10 }} hidden={drawerOpened}>
                        <Button
                            size={xsScreen ? 'xs' : 'sm'}
                            variant="outline" color='blue'
                            leftIcon={<Settings size={16} />}
                            styles={(theme) => ({
                                root: {
                                    paddingLeft: 5,
                                    paddingRight: 5,
                                },
                                leftIcon: {
                                    marginRight: xsScreen ? 0 : 5,
                                }
                            })}
                            onClick={() => setDrawerOpened(!drawerOpened)}>{xsScreen ? '' : 'Options'}</Button>
                        <Link href="/palettes" passHref>
                            <a>
                                <ThemeIcon size={30} variant="outline" color="dark">
                                    <Palette size={16} />
                                </ThemeIcon>
                            </a>
                        </Link>
                    </Group>
                </MediaQuery>
            </Affix>
        </>
    )
}
