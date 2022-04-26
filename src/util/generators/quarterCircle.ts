import { createClipping, CreatorFunc, drawRect, generateXYCoords } from "./common";

/**
 * Create a block with a quarter circle from one of the corners
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block) => {
    const { x, y } = generateXYCoords(block);
    const { size, color, opts } = block;

    const group = drawer.group().addClass("qs");
    const circleGroup = drawer.group();

    drawRect(group, block); // BG

    const xOffset = size * (opts.coin ? 1 : 0);
    const yOffset = size * (opts.coin2 ? 1 : 0);

    // Draw Foreground
    circleGroup
        .circle(size * 2)
        .fill(color.fg)
        .center(x + xOffset, y + yOffset);

    if (opts.coin06) {
        circleGroup
            .circle(size)
            .fill(color.bg)
            .center(x + xOffset, y + yOffset);
    }

    createClipping(drawer, circleGroup, block);

    group.add(circleGroup);
}

export const ID = 'quart';
