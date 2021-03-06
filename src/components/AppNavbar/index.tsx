import { Navbar, ScrollArea } from '@mantine/core'

import { Options } from '@/components/Options'

export const AppNavbar = () => {
    return (
        <Navbar width={{ sm: 300, lg: 350 }} p="xs" hiddenBreakpoint='sm' hidden={true} pt={0} pb={0}>
            <Navbar.Section grow mt="xs">
                <ScrollArea
                    styles={() => ({
                        root: {
                            height: 'calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))'
                        },
                        viewport: {
                            paddingBottom: 10
                        }
                    })}>
                    <Options multiple  />
                </ScrollArea>
            </Navbar.Section>
        </Navbar>
    )
}
