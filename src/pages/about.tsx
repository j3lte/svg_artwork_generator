import { useMemo } from 'react';
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo';
import { Accordion, AppShell, Container, Space, Text, ThemeIcon, Title, List, Blockquote } from '@mantine/core'
import { Check, ChevronRight, Clock, Flame, List as ListIcon } from 'tabler-icons-react'
import { AppHeader } from '@/components/AppHeader'
import { AppFooter } from '@/components/AppFooter'
import { ExternalLinkText } from '@/components/ExternalLinkText'
import { loadedHistory } from '@/util/history'

import techList from '@/data/tech.json';
import { websiteTitle } from '@/data/seo';

const AboutPage: NextPage = () => {

    const history = useMemo(() => (
        loadedHistory.map((item) => (
            <List.Item key={`${item.num}-${item.version}`}>
                <Blockquote
                    pt={5} pl={5}
                    cite={item.date}
                    icon={<Clock size={24} />}
                >
                    Version: {item.version}
                    <List mt={5} size={'sm'} icon={<Check size={12} />}>
                        {item.notes?.map((note, index) => (<List.Item key={`${item.num}-${item.version}-${index}`}>{note}</List.Item>))}
                    </List>
                </Blockquote>
            </List.Item>
        ))
    ), []);

    const listTech = useMemo(() => (
        techList.map(item => (
            <List.Item key={item.id}><ExternalLinkText text={item.title} link={item.url} /></List.Item>
        ))
    ), [])

    return (
        <>
            <NextSeo
                title={`About | ${websiteTitle}`}
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
                <Container pb={70}>
                    <Title order={2}>SVG Artwork Generator</Title>
                    <Text>Inspired by <ExternalLinkText text='this post' link='https://frontend.horse/articles/generative-grids/' /> titled &quot;Creating Generative SVG Grids&quot;, I decided to take the code and create a web app out of it. It features quite a few options that you can configure, go check it out and share your pictures!</Text>
                    <Space h="lg" />
                    <Text><Text weight={700}>Note:</Text> When you use more rows &amp; columns, it takes longer to generate a picture. Keep it reasonable. It might also break if you set the blocksize too high. More information will be added later</Text>
                    <Space h="lg" />
                    <Accordion disableIconRotation>
                        <Accordion.Item
                            label="Tech"
                            icon={
                                <ThemeIcon color="red" variant="light">
                                    <Flame size={14} />
                                </ThemeIcon>
                            }
                        >
                            <List icon={<ChevronRight size={12} />} spacing={5}>
                                {listTech}
                            </List>
                        </Accordion.Item>
                        <Accordion.Item
                            label="Version History"
                            icon={
                                <ThemeIcon color="green" variant="light">
                                    <ListIcon size={14} />
                                </ThemeIcon>
                            }
                        >
                            <List listStyleType={'none'}>
                                {history}
                            </List>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            </AppShell>
        </>
  )
}

export default AboutPage
