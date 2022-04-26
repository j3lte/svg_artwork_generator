import { Box, Footer, Text } from "@mantine/core";
import { Copyright } from "tabler-icons-react";

export const AppFooter = ({ hideCopy }: { hideCopy?: boolean }) => (
    <Footer height={60} p="xs" fixed position={{ bottom: 0, left: 0, right: 0 }}>
        <Box
            sx={(theme) => ({ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'end' })}
            hidden={hideCopy}>
            <Copyright size={20} /><Text size='md' ml={5}>Jelte Lagendijk, {(new Date()).getFullYear()}</Text>
        </Box>
    </Footer>
)
