import {
    XORShift,
    XORShift128,
    XORShift128Plus,
    XORShift64,
} from 'random-seedable';

type RandomizerType = XORShift | XORShift64 | XORShift128 | XORShift128Plus;

export enum RandomizerID {
    TYPE32 = '32',
    TYPE64 = '64',
    TYPE128 = '128',
    TYPE128PLUS = '128Plus',
}

export class Randomizer {
    private randomizer: RandomizerType;

    constructor(
        seed?: number | bigint,
        type: RandomizerID = RandomizerID.TYPE64
    ) {
        if (type === RandomizerID.TYPE64) {
            this.randomizer = new XORShift64(seed);
        } else if (type === RandomizerID.TYPE32) {
            this.randomizer = new XORShift(seed);
        } else if (type === RandomizerID.TYPE128) {
            this.randomizer = new XORShift128(seed);
        } else if (type === RandomizerID.TYPE128PLUS) {
            this.randomizer = new XORShift128Plus(seed);
        } else {
            throw new Error(`Unknown Randomizer type, ${type} is not valid`);
        }
    }

    get random() {
        return this.randomizer;
    }

    reset(): void {
        this.randomizer.reset();
    }

    int() {
        return this.randomizer.int();
    }

    choice<T>(array: T[]): T {
        return this.randomizer.choice(array);
    }

    shuffle<T>(array: T[], inPlace?: boolean): T[] {
        return this.randomizer.shuffle(array, inPlace);
    }

    coin(pTrue?: number) {
        return this.randomizer.coin(pTrue);
    }

    coinFlips(chances: Array<number | null>): Array<boolean> {
        return chances.map((chance) =>
            this.random.coin(chance === null ? 0.5 : chance)
        );
    }

    randRange(min: number, max: number) {
        return this.randomizer.randRange(min, max);
    }
}
