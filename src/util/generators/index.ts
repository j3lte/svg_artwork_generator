import { CreatorFunc } from './common';

import * as empty from './empty';
import * as circle from './circle';
import * as triangle from './triangle';
import * as cross from './cross';
import * as heart from './heart2';
import * as heartline from './heart2line';
import * as diagonal from './diagonal';
import * as dots from './roundedDots';
import * as squareDots from './squareDots';
import * as star from './star';
import * as halfSquare from './halfSquare';
import * as letter from './letter';
import * as oppositeCircles from './oppositeCircles';
import * as quarterCircle from './quarterCircle';

export type { CreatorFunc } from './common';

export type generatorKey =
    | typeof empty.ID
    | typeof circle.ID
    | typeof triangle.ID
    | typeof heart.ID
    | typeof heartline.ID
    | typeof star.ID
    | typeof cross.ID
    | typeof diagonal.ID
    | typeof dots.ID
    | typeof squareDots.ID
    | typeof halfSquare.ID
    | typeof letter.ID
    | typeof oppositeCircles.ID
    | typeof quarterCircle.ID;

export const generatorMappings: { [key in generatorKey]: CreatorFunc } = {
    empty: empty.generator,
    half: halfSquare.generator,
    diag: diagonal.generator,
    circle: circle.generator,
    triangle: triangle.generator,
    star: star.generator,
    heart: heart.generator,
    heartline: heartline.generator,
    quart: quarterCircle.generator,
    dots: dots.generator,
    sqdots: squareDots.generator,
    cross: cross.generator,
    opp: oppositeCircles.generator,
    let: letter.generator,
};

export type ColorType = '1C' | '2C' | '3C' | 'MC';

export const flatLabelMapping: Array<{
    value: generatorKey;
    label: string;
    type: ColorType;
    group: number;
}> = [
    { value: 'empty', group: 1, type: '1C', label: 'Flat' },
    { value: 'half', group: 1, type: '2C', label: 'Half Square' },
    { value: 'diag', group: 1, type: '2C', label: 'Diagonal' },

    { value: 'star', group: 2, type: '2C', label: 'Star' },
    { value: 'triangle', group: 2, type: '2C', label: 'Triangle' },
    { value: 'heart', group: 2, type: '2C', label: 'Heart' },
    { value: 'heartline', group: 2, type: '2C', label: 'Heart (Open)' },

    { value: 'circle', group: 3, type: '2C', label: 'Circle' },
    { value: 'quart', group: 3, type: '2C', label: 'Quarter Circle' },
    { value: 'opp', group: 3, type: '2C', label: 'Opposite Circle' },

    { value: 'dots', group: 4, type: '2C', label: 'Rounded Dots' },
    { value: 'sqdots', group: 4, type: '2C', label: 'Square Dots' },

    { value: 'cross', group: 5, type: '2C', label: 'Cross' },
    { value: 'let', group: 5, type: '2C', label: 'Letters' },
    // { value: 'heart',       group: 4, type: '2C', label: 'Heart' },
];
