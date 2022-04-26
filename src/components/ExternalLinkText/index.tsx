import { Text } from '@mantine/core'

export const ExternalLinkText = ({text, link}: { text: string, link: string}) => (
    <Text variant="link" component="a" href={link} target={'_blank'} rel={'noreferer'}>{text}</Text>
)
