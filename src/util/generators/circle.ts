import { CreatorFunc, drawRect, generateXYCoords } from "./common";

/**
 * Create circle, with a 30% chance of adding a smaller circle
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block) => {
    const { x, y } = generateXYCoords(block);
    const { size, color, opts } = block;

    const group = drawer.group().addClass("block-circle");

    drawRect(group, block);

    group.circle(size * 0.98).fill(color.fg).move(x + (0.01 * size), y + (0.01 * size));

    if (opts.coin03) {
        group
            .circle(size / 2)
            .fill(color.bg)
            .move(x + (size / 4), y + (size / 4))
    }
}

export const ID = 'circle';
