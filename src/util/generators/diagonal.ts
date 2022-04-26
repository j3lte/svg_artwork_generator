import { CreatorFunc, drawRect, generateXYCoords } from "./common";

/**
 * Create a block with a diagonal block
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block) => {
        const { x, y } = generateXYCoords(block);
        const { size, color, opts } = block;

        const group = drawer.group().addClass("block-diagonal");

        drawRect(group, block); // BG

        // Draw Foreground
        let polygon;
        if (opts.coin) {
            polygon = group.polygon(
                `${x},${y} ${x},${y + size}, ${x + size},${y}`
            );
        } else {
            polygon = group.polygon(
                `${x},${y} ${x + size},${y} ${x + size},${y + size}`
            );
        }

        polygon
            .fill(color.fg)
}

export const ID = 'diag';
