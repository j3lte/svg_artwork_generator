import { CreatorFunc, drawRect, generateXYCoords, getGroup } from './common';

/**
 * Create box with letters
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block, options) => {
    const { x, y } = generateXYCoords(block);
    const {
        size,
        color,
        opts: { character, rotate },
    } = block;

    const group = getGroup(drawer, 'lt', options?.optimize);

    drawRect(group, block); // BG

    // Draw Foreground
    const text = group.plain(character);
    text.font({
        family: 'Source Code Pro',
        size: size * 1.1,
        weight: 800,
        anchor: 'middle',
        fill: color.fg,
        leading: 1,
    });
    text.center(x + size / 2, y + size / 2);

    if (rotate === 90) {
        text.dx(size * 0.035).rotate(rotate);
    } else if (rotate === 180) {
        text.dy(size * 0.035).rotate(rotate);
    } else if (rotate === 270) {
        text.dx(size * -0.035).rotate(rotate);
    }
};

export const ID = 'let';
