import { CreatorFunc, drawRect, generateXYCoords } from "./common";

/**
 * Create box with letters
 * @param drawer
 * @param block
 */
export const generator: CreatorFunc = (drawer, block) => {
    const { x, y } = generateXYCoords(block);
    const { size, color, opts } = block;

    const group = drawer.group().addClass("lt");

    drawRect(group, block); // BG

    // Draw Foreground
    const character = opts.character;
    const text = group.plain(character);
    text.font({
        family: "Source Code Pro",
        size: size * 1.2,
        weight: 800,
        anchor: "middle",
        fill: color.fg,
        leading: 1
    });
    text.center(x + (size / 2), y + (size / 2) * 0.91);
    const rotate = opts.rotate;
    text.rotate(rotate);

    if (rotate === 90) {
        text.center(x + (size / 2) * 1.08, y + (size / 2) * 0.85); // r = 90
    } else if (rotate === 180) {
        text.center(x + (size / 2), y + (size / 2) * 0.75); // r = 180
    } else if (rotate === 270) {
        text.center(x + (size / 2) * 0.9, y + (size / 2) * 0.85); // r = 270
    }
}

export const ID = 'let';
