import { CreatorFunc, drawRect, generateXYCoords, getGroup } from "./common";

/**
 * Create a block with a diagonal block
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block, options) => {
        const { x, y } = generateXYCoords(block);
        const { size, color, opts } = block;

        const group = getGroup(drawer, 'di', options?.optimize);

        drawRect(group, block); // BG

        const path = opts.coin ?
            `${x},${y} ${x},${y + size}, ${x + size},${y}` :
            `${x},${y} ${x + size},${y} ${x + size},${y + size}`;

        group.polygon(path).fill(color.fg);
}

export const ID = 'diag';
