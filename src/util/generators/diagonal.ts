import { CreatorFunc, drawRect, generateXYCoords } from "./common";

/**
 * Create a block with a diagonal block
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block) => {
        const { x, y } = generateXYCoords(block);
        const { size, color, opts } = block;

        const group = drawer.group().addClass("di");

        drawRect(group, block); // BG

        const path = opts.coin ?
            `${x},${y} ${x},${y + size}, ${x + size},${y}` :
            `${x},${y} ${x + size},${y} ${x + size},${y + size}`;

        group.polygon(path).fill(color.fg);
}

export const ID = 'diag';
