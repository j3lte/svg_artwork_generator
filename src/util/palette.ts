import NICE_COLOR_PALETTE from '@/data/palette_nice.json';
import BRAND_COLOR_PALETTE from '@/data/palette_brand.json';

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
    colors: p,
}));

const palette_brand: Array<PaletteChoice> = BRAND_COLOR_PALETTE.reduce(
    (arr, brand) => {
        let colors = brand.colors.map((c) => `#${c}`);
        if (colors.length === 1) {
            colors = [...colors, '#FFFFFF'];
        }
        arr.push({
            group: 'Brand',
            label: `${brand.title}`,
            value: `brand_${brand.slug}`,
            colors,
        });
        return arr;
    },
    [] as Array<PaletteChoice>
);

export const paletteChoices: Array<PaletteChoice> = [
    ...palette_nice,
    ...palette_brand,
];
