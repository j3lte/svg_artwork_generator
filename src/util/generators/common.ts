import { G, Svg, Rect } from "@svgdotjs/svg.js";
import { Block } from "../generator";

export type CreatorFunc = (drawer: Svg | G, block: Block) => void;

export const generateXYCoords = ({ row, col, size }: Block): {x: number, y: number} => ({
    x: col * size,
    y: row * size
})

export const drawRect = (drawer: G | Svg, block: Block, bgColor?: string): Rect => {
    const fillColor = bgColor || block.color.bg;
    const { x, y } = generateXYCoords(block);

    return drawer
        .rect(block.size, block.size)
        .fill(fillColor)
        .move(x, y);
}

export const createClipping = (drawer: Svg | G, group: G, block: Block): Rect => {
    const clipping = drawRect(drawer, block, '#FFFF');
    group.clipWith(clipping);

    return clipping;
}
