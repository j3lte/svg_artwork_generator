import { Rect } from "@svgdotjs/svg.js";
import { drawRect, CreatorFunc, getGroup } from "./common";

export const generator: CreatorFunc = (drawer, block, opts): Rect => {
    const color = block.opts.coin ? block.color.fg : block.color.bg;
    return drawRect(
        getGroup(drawer, 'em', opts?.optimize),
        block,
        color
    );
}

export const ID = 'empty';
