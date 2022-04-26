import { CreatorFunc, drawRect, generateXYCoords } from "./common";

/**
 * Create box with half a square
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block) => {
    const { x, y } = generateXYCoords(block);
    const { size, color, opts } = block;

    const group = drawer.group().addClass("block-half-square");

    let halfX = 2;
    let halfY = 2;
    if (opts.coin) {
        halfX = 1;
    } else {
        halfY = 1;
    }

    drawRect(group, block); // BG

    // Draw Foreground
    group
        .rect(size / halfX, size / halfY)
        .fill(color.fg)
        .move(x, y);
}

export const ID = 'half';
