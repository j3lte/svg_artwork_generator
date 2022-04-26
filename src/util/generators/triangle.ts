import { CreatorFunc, drawRect, generateXYCoords } from "./common";

export const generator: CreatorFunc = (drawer, block) => {
    const { x, y } = generateXYCoords(block);
    const { size, color, opts } = block;

    const group = drawer.group().addClass("block-triangle");

    drawRect(group, block);

    const side = size * 0.6;

    const mX = x + (size / 2);
    const mY = y + (size / 2);
    const height = side * (Math.sqrt(3)/2);
    const offSet = size / 10;

    group.polygon([
        [mX + (height / Math.sqrt(3)), mY + (height / 3) + offSet],
        [mX - (height / Math.sqrt(3)), mY + (height / 3) + offSet],
        [mX , mY - (height * 2/3) + offSet]
    ])
        .addClass('triangle')
        .fill(color.fg)
        .rotate(opts.rotate);

}

export const ID = 'triangle';
