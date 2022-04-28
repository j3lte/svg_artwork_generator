import { useUIContext, XYCoordinate } from "@/context/UIContext";
import { PaletteChoice } from "@/util/palette";
import { ScrollArea, SimpleGrid, Container } from "@mantine/core";
import useSize from "@react-hook/size";
import { useDebouncedCallback } from "beautiful-react-hooks";
import { FC, PropsWithChildren, useRef, useMemo, useEffect, useState, MutableRefObject } from "react";
import { PaletteCard } from "../PaletteCards";

interface PaletteTabsContainerProps {
    palettes: PaletteChoice[];
    selected: string | null;
    onClick: (palette: PaletteChoice) => void;
    tabID: number;
}

export const PaletteTabsContainer: FC<PropsWithChildren<PaletteTabsContainerProps>> = ({ palettes, selected, onClick, tabID }) => {
    const ui = useUIContext();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);

    const [,height] = useSize(containerRef, { initialWidth: 0, initialHeight: 0 });
    const [isScrolledTo, setIscrolledTo] = useState(false);

    const setPosition = useDebouncedCallback((position: XYCoordinate) => {
        ui.onPaletteScrollPositionChange(position);
    }, [], 100);

    useEffect(() => {
        if (height > 0 && !isScrolledTo && tabID === ui.activePaletteTab && viewportRef.current !== null) {
            setIscrolledTo(true);
            setTimeout(() => {
                (viewportRef.current as HTMLDivElement).scrollTo({ top: ui.paletteScrollPosition.y, behavior: 'smooth' });
            }, 200);
        }
    }, [height, isScrolledTo, tabID, ui.activePaletteTab, ui.paletteScrollPosition]);

    const cards = useMemo(() => palettes.map(p => (
        <PaletteCard
            key={p.value}
            palette={p}
            selected={selected === p.value}
            onClick={onClick}
            initialHeight={100}
        />
    )), [palettes, selected, onClick]);

    return (
        <Container fluid sx={{ height: '100%' }} ref={containerRef}>
            <ScrollArea
                style={{ height }}
                onScrollPositionChange={setPosition}
                viewportRef={viewportRef}
            >
                <SimpleGrid
                    cols={4}
                    spacing="lg"
                    breakpoints={[
                        { maxWidth: 'md', cols: 3, spacing: 'md' },
                        { maxWidth: 'sm', cols: 2, spacing: 'sm' },
                        { maxWidth: 'xs', cols: 2, spacing: 'sm' },
                    ]}
                >
                    {cards}
                </SimpleGrid>
            </ScrollArea>
        </Container>
    )
}
