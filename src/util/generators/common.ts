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

    const rect = drawer.rect(block.size, block.size);

    rect.fill(fillColor);
    rect.move(x, y);

    return rect;
}

export const createClipping = (drawer: Svg | G, group: G, block: Block): Rect => {
    const clipping = drawRect(drawer, block, '#FFFF');
    group.clipWith(clipping);

    return clipping;
}
