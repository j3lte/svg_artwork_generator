import { useUIContext } from "@/context/UIContext"
import { Drawer, ScrollArea, Affix, MediaQuery, Button } from "@mantine/core"
import { Settings } from "tabler-icons-react"
import { Options } from "../Options"

export const BottomDrawerMobile = () => {
    const { drawerOpened, setDrawerOpened } = useUIContext();

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
                </ScrollArea>
            </Drawer>
            <Affix position={{ bottom: 12, left: 12 }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Button
                        size="sm"
                        hidden={drawerOpened}
                        variant="outline" color='blue'
                        leftIcon={<Settings size={16} />}
                        styles={(theme) => ({
                            root: {
                                paddingLeft: 5,
                                paddingRight: 5,
                            },
                            leftIcon: {
                                marginRight: 5,
                            }
                        })}
                        onClick={() => setDrawerOpened(!drawerOpened)}>Options</Button>
                </MediaQuery>
            </Affix>
        </>
    )
}
