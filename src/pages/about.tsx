import { useMemo } from 'react';
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo';
import { Accordion, AppShell, Container, Space, Text, ThemeIcon, Title, List } from '@mantine/core'
import { BrandGithub, ChevronRight, Flame, Notebook } from 'tabler-icons-react'
import { AppHeader } from '@/components/AppHeader'
import { AppFooter } from '@/components/AppFooter'
import { ExternalLinkText } from '@/components/ExternalLinkText'

import techList from '@/data/tech.json';
import { websiteTitle } from '@/util/seo';

const AboutPage: NextPage = () => {

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
                styles={() => ({
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
                    <Accordion disableIconRotation>
                        <Accordion.Item
                            label="Notes & Issues"
                            icon={
                                <ThemeIcon color="blue" variant="outline">
                                    <Notebook size={14} />
                                </ThemeIcon>
                            }
                        >
                            <Text>- When you use more rows &amp; columns, it takes longer to generate a picture. Reduce the number if it gets too slow.</Text>
                            <Text>- Downloading a PNG might break if you set the blocksize too high. There are <ExternalLinkText link='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas#maximum_canvas_size' text='limitations per browser' />. In a future release I might add server-side image generation to circumvent this.</Text>
                        </Accordion.Item>
                        <Accordion.Item
                            label="Open Source"
                            icon={
                                <ThemeIcon color="dark" variant="outline">
                                    <BrandGithub size={14} />
                                </ThemeIcon>
                            }
                        >
                            <Text>I believe in the power of Open Source. That&apos;s why this project is available on <ExternalLinkText link='https://github.com/j3lte/svg_artwork_generator' text='Github' />. Feel free to play around with the code. If you have great suggestions, please submit them as a Github Issue/Pull Request.</Text>
                        </Accordion.Item>
                        <Accordion.Item
                            label="Tech"
                            icon={
                                <ThemeIcon color="red" variant="outline">
                                    <Flame size={14} />
                                </ThemeIcon>
                            }
                        >
                            <List icon={<ChevronRight size={12} />} spacing={5}>
                                {listTech}
                            </List>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            </AppShell>
        </>
  )
}

export default AboutPage
