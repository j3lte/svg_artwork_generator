import { CreatorFunc, drawRect, generateXYCoords } from "./common";

/**
 * Create box with half a square
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block) => {
    const { x, y } = generateXYCoords(block);
    const { size, color, opts } = block;

    const group = drawer.group().addClass("hs");

    const halfX = opts.coin ? 1 : 2;
    const halfY = !opts.coin ? 1 : 2;

    drawRect(group, block); // BG

    // Draw Foreground
    group
        .rect(size / halfX, size / halfY)
        .fill(color.fg)
        .move(x, y);
}

export const ID = 'half';
