import {
    CreatorFunc,
    drawRect,
    generateXYCoords,
    getGroup,
    roundNumber,
} from './common';

/**
 * Create a block with a cross in it
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block, options) => {
    const optimize = options?.optimize;
    const { x, y } = generateXYCoords(block);
    const { size, color, opts } = block;

    const group = getGroup(drawer, 'cr', optimize);
    const crossGroup = getGroup(drawer, null);

    const shortEdge = roundNumber(size / 5);
    const longEdge = roundNumber(size / 1.5);
    const half = roundNumber(size / 2);

    drawRect(group, block); // BG

    // Draw Foreground
    crossGroup
        .rect(longEdge, shortEdge)
        .fill(color.fg)
        .center(x + half, y + half);

    crossGroup
        .rect(shortEdge, longEdge)
        .fill(color.fg)
        .center(x + half, y + half);

    if (opts.coin04) {
        crossGroup.transform({ rotate: 45, origin: 'center center' });
    }

    group.add(crossGroup);
};

export const ID = 'cross';
