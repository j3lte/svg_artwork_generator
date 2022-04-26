import { createClipping, CreatorFunc, drawRect, generateXYCoords } from "./common";

/**
 * Create a block with two quarter circles
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block) => {
    const { x, y } = generateXYCoords(block);
    const { size, color, opts } = block;

    const group = drawer.group().addClass("os")
    const circleGroup = drawer.group()

    drawRect(group, block); // BG

    const offset = opts.coin ?
        // top left + bottom right
        [0, 0, size, size] :
        // top right + bottom left
        [0, size, size, 0]

    circleGroup.circle(size).fill(color.fg).center(x + offset[0], y + offset[1]);
    circleGroup.circle(size).fill(color.fg).center(x + offset[2], y + offset[3])

    createClipping(drawer, circleGroup, block);

    group.add(circleGroup)
}

export const ID = 'opp';
