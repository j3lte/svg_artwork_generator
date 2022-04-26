import { Rect } from "@svgdotjs/svg.js";
import { drawRect, CreatorFunc } from "./common";

export const generator: CreatorFunc = (drawer, block): Rect => {
    const group = drawer.group().addClass('block-empty');
    return drawRect(group, block); // BG
}

export const ID = 'empty';
