import { PaletteChoice } from "@/util/palette";
import { Card, Group, Box, Text, Badge } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import useViewportSpy from "src/hooks/useViewPortSpy";
import { Lock } from "tabler-icons-react";

interface PaletteCardProps {
    palette: PaletteChoice;
    locked: boolean;
    selected: boolean;
    initialHeight: number;
    onClick: (palette: PaletteChoice) => void;
    onServer?: boolean;
}

const Colors = ({ palette }: {palette: PaletteChoice}) => (
    <>
        {palette.colors.map((c, i) => (
            <Box
                key={`${palette.label}_${c}_${i}`}
                sx={(theme) => ({
                    height: 50,
                    flexGrow: 1,
                    background: c,
                    '@media (max-width: 755px)': {
                        height: 40
                    },
                })}
            />
        ))}
    </>
)

export const PaletteCard = ({ palette, locked, selected, onClick, initialHeight }: PaletteCardProps) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [isSeen, setIsSeen] = useState(false);
    const isVisible = useViewportSpy(cardRef);

    useEffect(() => {
        if (isVisible && !isSeen) {
            setIsSeen(true);
        }
    }, [isVisible, isSeen])

    return (
        <Card
            ref={cardRef}
            shadow="sm"
            p="sm"
            pb={5}
            withBorder
            sx={(theme) => ({
                background: selected ? theme.colors.gray[2] : 'light',
                cursor: locked ? 'default' : 'pointer',
                height: isSeen ? 'auto' : initialHeight
            })}
            onClickCapture={() => {
                if (!locked) {
                   onClick(palette);
                }
            }}
        >
            <Card.Section>
                {isSeen ? (
                <Group noWrap sx={{ gap: 0 }}>
                    <Colors palette={palette} />
                </Group>
                ): (<Box sx={{ height: 50 }} />) }
            </Card.Section>
            <Group position="apart" sx={(theme) => ({ marginBottom: 5, marginTop: theme.spacing.sm })}>
                <Text size='sm' sx={(theme) => ({ fontWeight: selected ? 800 : 400, userSelect: 'none' })}>{palette.label}</Text>
                <Group noWrap sx={{ gap: 3 }}>
                    {locked && selected ? (<Lock size={16} />) : null}
                    {selected ? (<Badge color="dark" variant="light">
                        Selected
                    </Badge>) : null}
                </Group>
            </Group>
        </Card>
    )
}
