import { useEffect, useRef, useState } from "react";
import { Affix, Button, Group, LoadingOverlay, Paper } from "@mantine/core";
import { Download, Refresh, Viewfinder } from "tabler-icons-react";
import useSize from "@react-hook/size";
import { useDebouncedCallback } from "beautiful-react-hooks";
import { observer } from "mobx-react-lite";
import { LinkedHTMLElement } from "@svgdotjs/svg.js";

import { useStoreContext } from "@/context/StoreContext";

import { createSvgDrawer, resizeDrawer } from "@/util/svg";
import { generateBlocks } from "@/util/generator";
import { savePNG, saveSVG } from "@/util/saveImage";
import { useUIContext } from "@/context/UIContext";

const defaultButtomStyles = {
    root: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    leftIcon: {
        marginRight: 5,
    }
}

export const Renderer = observer(() => {
    const elRef = useRef<HTMLDivElement | null>(null);
    const store = useStoreContext();
    const { drawerOpened } = useUIContext();
    const [loading, setLoading] = useState(false);

    const {blocks, viewBox, generators, size, ready, filters, paletteColors} = store;
    const [width, height] = useSize(elRef, { initialWidth: 100, initialHeight: 100 });

    const fixWidthSvg = useDebouncedCallback((width: number, height: number) => {
        if (elRef.current) {
            resizeDrawer(elRef.current, width, height, 32);
        }
    });

    const resetZoom = useDebouncedCallback(() => {
        if (elRef.current && elRef.current.firstChild) {
            const drawer = (elRef.current.firstChild as LinkedHTMLElement).instance.root();
            drawer.viewbox(store.viewBox);
        }
    });

    useEffect(() => {
        if (elRef.current && ready) {
            const drawer = createSvgDrawer(elRef.current, viewBox);
            generateBlocks({drawer, blocks, generators, size, filters, colors: paletteColors});
        }
    }, [blocks, viewBox, ready, generators, size, filters, paletteColors]);

    useEffect(() => {
        resetZoom();
    }, [store.numberOfCols, store.numberOfRows, resetZoom]);

    useEffect(() => {
        if (width !== 0 && height !== 0) {
            fixWidthSvg(width, height);
        }
    }, [width, height, fixWidthSvg]);

    return (
        <>
            <Paper
                sx={(theme) => ({
                    zIndex: 100,
                    height: 'calc(100vh - 154px)',
                })}
                ref={elRef}
            >
            </Paper>
            <LoadingOverlay
                visible={loading}
                transitionDuration={250}
                overlayColor={'white'}
                overlayOpacity={0.8}
            />
            <Affix position={{ bottom: 12, right: 12 }}>
                <Group noWrap sx={{ gap: 8 }} hidden={drawerOpened}>
                    <Button
                        size="sm"
                        disabled={store.lockedPalette && store.lockedSeed}
                        hidden={store.lockedPalette && store.lockedSeed}
                        variant="outline" color={"dark"}
                        leftIcon={<Refresh size={16} />}
                        styles={defaultButtomStyles}
                        onClick={() => {
                            store.randomize();
                        }}>
                            Random
                        </Button>
                    <Button
                        size="sm"
                        variant="outline" color={'dark'}
                        leftIcon={<Viewfinder size={16} />}
                        styles={defaultButtomStyles}
                        onClick={resetZoom}>
                            Reset zoom
                        </Button>
                    <Button
                        size="sm"
                        variant="outline" color='teal'
                        leftIcon={<Download size={16} />}
                        styles={defaultButtomStyles}
                        onClick={() => {
                            if (elRef && elRef.current) {
                                setLoading(true);
                                const svg = elRef.current.querySelector('svg') as SVGSVGElement;
                                const name = `artwork_${store.palette.value}_${store.randomSeed}`;
                                savePNG(svg, {
                                    size: store.size,
                                    filename: name
                                }).finally(() => {
                                    setLoading(false);
                                });
                            }
                        }}>
                            PNG
                        </Button>
                    <Button
                        size="sm"
                        variant="outline" color='teal'
                        leftIcon={<Download size={16} />}
                        styles={defaultButtomStyles}
                        onClick={() => {
                            if (elRef && elRef.current) {
                                setLoading(true);
                                const svg = elRef.current.querySelector('svg') as SVGSVGElement;
                                const name = `artwork_${store.palette.value}_${store.randomSeed}`;
                                saveSVG(svg, {
                                    size: store.size,
                                    filename: name
                                }).finally(() => {
                                    setLoading(false);
                                });
                            }
                        }}>
                            SVG
                        </Button>
                </Group>
            </Affix>
        </>
    )
})
