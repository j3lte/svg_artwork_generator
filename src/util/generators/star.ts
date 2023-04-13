import { CreatorFunc, drawRect, generateXYCoords, getGroup } from './common';

/**
 * Create a block with two quarter circles
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block, options) => {
    const { x, y } = generateXYCoords(block);
    const { size, color, opts } = block;

    const group = getGroup(drawer, 'os', options?.optimize);
    const star = getGroup(group, null);
    const rect = drawRect(star, block); // BG

    const newSize = 0.6 * size;

    const origPath =
        'M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z';

    star.path(origPath)
        .fill(color.fg)
        .stroke({ width: 50 })
        .center(x + size / 2, y + size / 2)
        .size(newSize, newSize)
        .cx(rect.cx())
        .cy(rect.cy());
    // .rotate([0, 90, 180, 270][opts.range0_3]);

    group.add(star);
};

export const ID = 'star';
