import { CreatorFunc, drawRect, generateXYCoords } from "./common";

/**
 * Create a block with a quarter circle from one of the corners
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block) => {
    const { x, y } = generateXYCoords(block);
    const { size, color, opts } = block;

    const group = drawer.group().addClass("qs");

    drawRect(group, block); // BG

    const s = size;
    const h = size / 2;
    const bigArc = `A${size},${size} 0 0 1`;
    const smallArc = `A${h},${h} 0 0 0`;

    const pathsFull = [
        `M${x},${y} L${x+s},${y} ${bigArc} ${x},${y+s} L${x},${y} z`,       // TOP-LEFT
        `M${x+s},${y} L${x+s},${y+s} ${bigArc} ${x},${y} L${x+s},${y} z`,   // TOP-RIGHT
        `M${x+s},${y+s} L${x},${y+s} ${bigArc} ${x+s},${y} L${x+s},${y} z`, // BOTTOM-RIGHT
        `M${x},${y+s} L${x},${y} ${bigArc} ${x+s},${y+s} L${x},${y+s} z`    // BOTTOM-LEFT
    ];

    const pathsHalf = [
        `M${x+h},${y} L${x+s},${y} ${bigArc} ${x},${y+s} L${x},${y+h} ${smallArc} ${x+h},${y} z`,       // TL
        `M${x+s},${y+h} L${x+s},${y+s} ${bigArc} ${x},${y} L${x+h},${y} ${smallArc} ${x+s},${y+h} z`,   // TR
        `M${x+h},${y+s} L${x},${y+s} ${bigArc} ${x+s},${y} L${x+s},${y+h} ${smallArc} ${x+h},${y+s} z`, // BR
        `M${x},${y+h} L${x},${y} ${bigArc} ${x+s},${y+s} L${x+h},${y+s} ${smallArc} ${x},${y+h} z`      // BL
    ];

    const paths = opts.coin ? pathsHalf : pathsFull;
    const chosen = paths[opts.range0_3];

    group.path(chosen).fill(color.fg);
}

export const ID = 'quart';
