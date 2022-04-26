import NICE_COLOR_PALETTE from '@/data/palette_nice.json';

export interface PaletteChoice {
    group: string;
    label: string;
    value: string;
    colors: string[];
}

const palette_nice: Array<PaletteChoice> = NICE_COLOR_PALETTE.map((p, i) => ({
    group: 'Nice',
    label: `Nice ${i}`,
    value: `nice_${i}`,
    colors: p
}));


export const paletteChoices: Array<PaletteChoice> = [
    ...palette_nice
];
