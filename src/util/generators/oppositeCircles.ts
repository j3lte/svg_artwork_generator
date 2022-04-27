import { CreatorFunc, drawRect, generateXYCoords, getGroup } from "./common";

/**
 * Create a block with two quarter circles
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block, options) => {
    const { x, y } = generateXYCoords(block);
    const { size, color, opts } = block;

    const group = getGroup(drawer, 'os', options?.optimize);

    drawRect(group, block); // BG

    const s = size;
    const h = size / 2;
    const arc = `A${h},${h} 0 0 1`;

    const paths = opts.coin ?
        [
            `M${x},${y} L${x+h},${y} ${arc} ${x},${y+h} L${x},${y} z`,       // TOP-LEFT
            `M${x+s},${y+s} L${x+h},${y+s} ${arc} ${x+s},${y+h} L${x+s},${y+s} z`, // BOTTOM-RIGHT
        ] :
        [
            `M${x+s},${y} L${x+s},${y+h} ${arc} ${x+h},${y} L${x+s},${y} z`,   // TOP-RIGHT
            `M${x},${y+s} L${x},${y+h} ${arc} ${x+h},${y+s} L${x},${y+s} z`    // BOTTOM-LEFT
        ]


    group.path(paths[0]).fill(color.fg);
    group.path(paths[1]).fill(color.fg);
}

export const ID = 'opp';
