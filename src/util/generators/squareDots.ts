import { CreatorFunc, drawRect, generateXYCoords, getGroup } from './common';

/**
 * Create a block with dots
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block, options) => {
    const { x, y } = generateXYCoords(block);
    const { size: blockSize, color, opts } = block;

    const group = getGroup(drawer, 'sd', options?.optimize);

    drawRect(group, block); // BG

    const size = opts.range2_4;
    const offset = Math.floor(block.size / 10);
    const squareSize = Math.floor(block.size / 10);
    const space = (blockSize - offset * 2 - squareSize) / (size - 1);

    // Draw Dots
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            group
                .rect(squareSize, squareSize)
                .fill(color.fg)
                .move(x + offset + i * space, y + offset + j * space);
        }
    }
};

export const ID = 'sqdots';
