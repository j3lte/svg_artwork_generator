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

    // const origPath =
    //     'M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181';
    const origPath =
        'm12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z';

    heart
        .path(origPath)
        .fill(color.fg)
        .center(x + size / 2, y + size / 2)
        .size(newSize, newSize)
        .cx(rect.cx())
        .cy(rect.cy())
        .rotate([0, 90, 180, 270][opts.range0_3]);

    heart
        .path(origPath)
        .fill(color.bg)
        .center(x + size / 2, y + size / 2)
        .size(newSize * 0.7, newSize * 0.6)
        .cx(rect.cx())
        .cy(rect.cy())
        .rotate([0, 90, 180, 270][opts.range0_3]);

    group.add(heart);
};

export const ID = 'heartline';
