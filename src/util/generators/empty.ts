import { Rect } from "@svgdotjs/svg.js";
import { drawRect, CreatorFunc, getGroup } from "./common";

export const generator: CreatorFunc = (drawer, block, opts): Rect => {
    return drawRect(
        getGroup(drawer, 'em', opts?.optimize),
        block
    );
}

export const ID = 'empty';
