import { CreatorFunc, drawRect, generateXYCoords, polygonPath } from "./common";

export const generator: CreatorFunc = (drawer, block) => {
    const { x, y } = generateXYCoords(block);
    const { size, color, opts } = block;

    const group = drawer.group().addClass("tr");

    drawRect(group, block);

    const midPoint: [number, number] = [x + (size / 2 + (size / 10)), y + (size / 2)];
    const radius = (size * 0.7) / 2;

    const path = polygonPath(midPoint, 3, radius);

    group
        .polygon(path)
        .fill(color.fg)
        .rotate(opts.rotate);
}

export const ID = 'triangle';
