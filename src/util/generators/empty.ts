import { Rect } from "@svgdotjs/svg.js";
import { drawRect, CreatorFunc } from "./common";

export const generator: CreatorFunc = (drawer, block): Rect => {
    return drawRect(
        drawer.group().addClass('em'),block); // BG
}

export const ID = 'empty';
