import { Box } from "@mantine/core"
import Image from "next/image"

export const LoadingScreen = ({ loading }: { loading: boolean }) => {
    if (!loading) {
        return null;
    }

    return (
        <Box
            sx={() => ({
                top: 0,
                left: 0,
                position: 'fixed',
                height: '100vh',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                background: 'rgba(0,0,0, 0.6)',
                zIndex: 9999
            })}
        >
            <Image src={'/spinner.svg'} width={250} height={250} alt='Loading' />
        </Box>
    )
}
