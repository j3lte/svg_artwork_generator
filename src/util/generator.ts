// https://codepen.io/a-trost/pen/rNGPxaJ

import { Svg } from "@svgdotjs/svg.js";
import { generatorKey, generatorMappings } from "./generators";
import { googleFont } from "./svg";
import { Randomizer } from "./random";
import { getRandomColors } from "./colors";

export interface GeneratorFilters {
    filterBlur?: number;
    filterDesaturate?: boolean;
    enabled?: boolean;
}
export interface CreateGeneratorBlockOpts {
    drawer: Svg;
    blocks: Array<Block>;
    generators: generatorKey[];
    size?: { width: number, height: number };
    filters: GeneratorFilters;
}
export interface BlockColors {
    size: number;
    fg: string;
    bg: string;
    c1: string;
    other: string[];
}

export interface BlockOptions {
    coin: boolean;
    coin2: boolean;
    coin03: boolean;
    coin04: boolean;
    coin06: boolean;
    coin08: boolean;
    range0_3: number;
    range2_4: number;
    rotate: number;
    character: string;
}

export interface Block {
    row: number;
    col: number;
    size: number;
    random: Randomizer;
    color: BlockColors;
    generator: generatorKey;
    opts: BlockOptions;
}

export const generateBlocksObjects = (
    rows: number,
    cols: number,
    blockSize: number,
    keys: generatorKey[],
    colors: string[],
    randomizer: Randomizer | null,
    charSet?: string[]
) => {
    const random = randomizer || new Randomizer();
    const characters = charSet || ['ABC']
    const blocks: Array<Block> = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

            const coinFlips = random.coinFlips([ null, null, 0.3, 0.4, 0.6, 0.8]);
            blocks.push({
                row,
                col,
                color: getRandomColors(colors, random),
                random,
                size: blockSize,
                generator: random.choice(keys),
                opts: {
                    coin: coinFlips[0],
                    coin2: coinFlips[1],
                    coin03: coinFlips[2],
                    coin04: coinFlips[3],
                    coin06: coinFlips[4],
                    coin08: coinFlips[5],
                    range0_3: random.randRange(0, 3),
                    range2_4: random.randRange(2, 4),
                    rotate: random.choice([0, 90, 180, 270]),
                    character: random.choice(characters)
                }
            });
        }
    }
    return blocks;
}


export const generateBlocks = (props : CreateGeneratorBlockOpts): void => {
    const { drawer, blocks, generators, filters } = props;
    drawer.clear();

    const defs = drawer.defs();

    // We're adding the Source Code Pro font to the SVG itself when we're using letters
    if (generators.includes('let')) {
      const style = defs.style();

      // @ts-ignore
      style.font('Source Code Pro', googleFont.src, { 'font-style': googleFont.fontStyle, 'font-weight': googleFont.fontWeight, 'unicode-range': googleFont.unicodeRange });
    }

    const groupDrawer = drawer.group().addClass('main');

    blocks.forEach(block => {
        const generator = generatorMappings[block.generator];
        generator(groupDrawer, block);
    });

    if (filters.enabled) {
        groupDrawer.filterWith(add => {
            if (filters.filterBlur && filters.filterBlur > 0) {
                const blur = add.gaussianBlur(filters.filterBlur, filters.filterBlur)
                blur.in('BlurFilter')
            }

            if (filters.filterDesaturate) {
                // @ts-ignore
                const desaturate = add.colorMatrix('saturate', 0)
                desaturate.in('DesaturateFilter')
            }
        })
    }
}
