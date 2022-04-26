import { BlockColors } from "./generator";
import { Randomizer } from "./random";

export type FixedSizeArray<N extends number, T, M extends string = '0'> = {
    readonly [k in M]: any;
} & { length: N } & ReadonlyArray<T>;


export const getRandomColors = (colors: string[], random?: Randomizer): BlockColors => {
    const rand = random || new Randomizer();
    const colorArray = rand.shuffle(colors, false) as string[];

    return {
        size: colorArray.length,
        bg: colorArray[0],
        fg: colorArray[1],
        c1: colorArray[2],
        other: colorArray.slice(3)
    }
}
