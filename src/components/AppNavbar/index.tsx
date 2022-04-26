import { Navbar, ScrollArea } from "@mantine/core"
import { Options } from "../Options"

export const AppNavbar = () => {
    return (
        <Navbar width={{ sm: 300, lg: 350 }} p="xs" hiddenBreakpoint='sm' hidden={true} pb={70}>
            <Navbar.Section grow mt="xs">
            <ScrollArea style={{ height: 'calc(100vh - 120px)' }}>
                <Options  />
            </ScrollArea>
            </Navbar.Section>
        </Navbar>
    )
}
