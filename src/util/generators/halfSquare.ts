import { CreatorFunc, drawRect, generateXYCoords, getGroup } from './common';

/**
 * Create box with half a square
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block, options) => {
    const { x, y } = generateXYCoords(block);
    const { size, color, opts } = block;

    const group = getGroup(drawer, 'hs', options?.optimize);

    const halfX = opts.coin ? 1 : 2;
    const halfY = !opts.coin ? 1 : 2;

    drawRect(group, block); // BG

    // Draw Foreground
    group
        .rect(size / halfX, size / halfY)
        .fill(color.fg)
        .move(x, y);
};

export const ID = 'half';
