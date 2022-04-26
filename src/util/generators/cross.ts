import { CreatorFunc, drawRect, generateXYCoords } from "./common";

/**
 * Create a block with a cross in it
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block) => {
    const { x, y } = generateXYCoords(block);
    const { size, color, opts } = block;

    const group = drawer.group().addClass("cr");
    const crossGroup = drawer.group();

    drawRect(group, block); // BG

    // Draw Foreground
    crossGroup
        .rect(size / 1.5, size / 5)
        .fill(color.fg)
        .center(x + size / 2, y + size / 2);

    crossGroup
        .rect(size / 1.5, size / 5)
        .fill(color.fg)
        .center(x + size / 2, y + size / 2)
        .transform({ rotate: 90 });

    if (opts.coin04) {
        crossGroup.transform({ rotate: 45, origin: "center center" });
    }

    group.add(crossGroup);
}

export const ID = 'cross';
