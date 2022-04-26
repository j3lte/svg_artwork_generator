import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { SVG, registerWindow, Svg } from "@svgdotjs/svg.js";
import { createSVGWindow } from 'svgdom';
import { generateBlocks, generateBlocksObjects } from "@/util/generator";
import { generatorKey } from "@/util/generators";
import { Randomizer } from "@/util/random";

const AVAILABLE_CHARACTERS = `ABCDEFGHIJKLMNPRSTUVWXYZ&123456789`.split('');
const generators: generatorKey[] = ['empty', 'half', 'diag', 'circle', 'triangle', 'quart', 'dots', 'sqdots', 'cross', 'opp', 'let']

const blocksGenerator = (row: number, col: number, blockSize: number) => {
    const random = new Randomizer((new Randomizer).int());

    const randomBlocks = generateBlocksObjects(
        row,
        col,
        blockSize,
        ['empty', 'half', 'diag', 'circle', 'triangle', 'quart', 'dots', 'sqdots', 'cross', 'opp', 'let'],
        ["#e94e77", "#d68189", "#c6a49a", "#c6e5d9", "#f4ead5"],
        random,
        AVAILABLE_CHARACTERS
    )

    return randomBlocks;
}

export const svgGenerator = (): string => {
    const window = createSVGWindow();
    const document = window.document;
    registerWindow(window, document);

    const svg: Svg = SVG(document.documentElement) as Svg;
    const drawer = svg.addClass('artwork-svg');

    const row = 10;
    const col = 10;
    const size = 100;

    const blocks = blocksGenerator(row, col, size);

    generateBlocks({
        drawer,
        blocks,
        generators,
        filters: {
        }
    })

    drawer.viewbox(`0 0 ${row*size} ${col*size}`)

    return svg.svg();
}


// TODO: Implement this
const GenerateSVG: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

    // console.time('test')
    // const svgString = svgGenerator();
    // console.log(svgString.length);
    // console.timeEnd('test')

    res
        .writeHead(200, {
            'Content-Type': 'image/svg+xml'
        })
        .write('');

    res.end();
}

export default GenerateSVG;
