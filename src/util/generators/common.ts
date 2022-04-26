import { G, Svg, Rect } from "@svgdotjs/svg.js";
import { Block } from "../generator";

export type CreatorFunc = (drawer: Svg | G, block: Block) => void;

export const generateXYCoords = ({ row, col, size }: Block): {x: number, y: number} => ({
    x: col * size,
    y: row * size
})

export const roundNumber = (num: number) => {
    var m = Number((Math.abs(num) * 10000).toPrecision(15));
    return Math.round(m) / 10000 * Math.sign(num);
}

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

/**
 * Disclaimer: I could think I'm a genius, but this code was blatantly copied from a Codepen, as I am not
 * a Math wizard....
 *
 * https://codepen.io/winkerVSbecks/pen/wrZQQm
 *
 */

const degreesToRadians = (angleInDegrees: number) => (Math.PI * angleInDegrees) / 180;
const range = (count: number) => Array.from(Array(count).keys());
const points = (sideCount: number, radius: number ) => {
    const angle = 360 / sideCount;
    const vertexIndices = range(sideCount);
    const offsetDeg = 90 - ((180 - angle) / 2);
    const offset = degreesToRadians(offsetDeg);

    return vertexIndices.map((index) => ({
            theta: offset + degreesToRadians(angle * index),
            r: radius,
    }));
}
export const polygonPath = (
    [centerX, centerY]: [number, number],
    sideCount: number,
    radius: number
): string =>
    points(sideCount, radius)
      .map(({ r, theta }) => [
        centerX + r * Math.cos(theta),
        centerY + r * Math.sin(theta),
      ])
      .join(' ');
