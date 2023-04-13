import { G } from '@svgdotjs/svg.js';
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
    const heart = getGroup(group, null);
    const rect = drawRect(heart, block); // BG

    const newSize = 0.6 * size;

    const origPath =
        'm12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z';

    heart
        .path(origPath)
        .fill(color.fg)
        .stroke({ width: 50 })
        .center(x + size / 2, y + size / 2)
        .size(newSize, newSize)
        .cx(rect.cx())
        .cy(rect.cy())
        .rotate([0, 90, 180, 270][opts.range0_3]);

    group.add(heart);
};

export const ID = 'heart';
