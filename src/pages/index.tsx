import type { NextPage } from 'next'
import { AppShell, Container } from '@mantine/core'
import { Renderer } from '@/components/Renderer'
import { BottomDrawerMobile } from '@/components/BottomDrawerMobile'
import { AppHeader } from '@/components/AppHeader'
import { AppNavbar } from '@/components/AppNavbar'
import { AppFooter } from '@/components/AppFooter'

const Home: NextPage = () => {

  return (
        <AppShell
            padding={'sm'}
            navbarOffsetBreakpoint="sm"
            header={<AppHeader />}
            navbar={<AppNavbar/>}
            footer={<AppFooter hideCopy />}
            styles={(theme) => ({
                body: {
                    paddingTop: 70,
                    paddingBottom: 60,
                    height: '100vh'
                }
            })}
        >
            <Container fluid sx={{ position: 'relative' }} pl={0} pr={0}>
                <Renderer />
                <BottomDrawerMobile/>
            </Container>
        </AppShell>
  )
}

export default Home
