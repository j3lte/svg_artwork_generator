import { CreatorFunc, drawRect, generateXYCoords } from './common';

/**
 * Create a block with a heart
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block) => {
    const { x, y } = generateXYCoords(block);
    const { size, color, opts } = block;

    const group = drawer.group().addClass('he');
    const heartGroup = drawer.group();

    drawRect(group, block); // BG

    // Draw Foreground
    const heart = heartGroup
        .path(
            'M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z'
        )
        .center(x + size / 2, y + size / 2)
        .dy(-(size / 8))
        .scale(0.25, 0.25)
        .rotate(225)
        .fill(color.fg);

    // const rotate = opts.rotate;
    const rotate = opts.rotate;

    if (rotate === 90) {
        heart.dx(size * -0.7).rotate(90);
    } else if (rotate === 180) {
        heart
            .dx(size * -0.7)
            .dy(size * -0.65)
            .rotate(180);
    } else if (rotate === 270) {
        heart
            .dx(size * -0.05)
            .dy(size * -0.65)
            .rotate(270);
    }

    group.add(heartGroup);
};

export const ID = 'heart';
