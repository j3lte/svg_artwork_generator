import { makeAutoObservable, toJS } from 'mobx';
import { makePersistable, configurePersistable } from 'mobx-persist-store';
import localForage from 'localforage';

import { Randomizer } from '@/util/random';
import { PaletteChoice, paletteChoices } from '@/util/palette';
import { generatorKey } from '@/util/generators';
import { enableStaticRendering } from 'mobx-react';
import {
    Block,
    generateBlocksObjects,
    GeneratorFilters,
} from '@/util/generator';

const isServer = typeof window === 'undefined';

enableStaticRendering(isServer);

configurePersistable(
    {
        storage: isServer ? undefined : localForage,
        expireIn: 86400000, // One day in millsesconds
        removeOnExpiration: true,
        stringify: false,
        debugMode: !isServer,
    },
    { delay: 200, fireImmediately: false }
);

export const AVAILABLE_CHARACTERS = `ABCDEFGHIJKLMNPRSTUVWXYZ&123456789`.split(
    ''
);

export type HydrateStoreProps = {
    blockSize: number;
    generators: generatorKey[];
    numberOfCols: number;
    numberOfRows: number;
    randomSeed: number | null;
    selectedPalette: string | null;
};

export class ArtStore {
    ready = false;

    numberOfRows = 5;
    numberOfCols = 5;
    blockSize = 100;

    randomSeed: null | number = new Randomizer().int();
    selectedPalette: null | string = new Randomizer().choice(paletteChoices)
        .value;

    lockedSeed = false;
    lockedPalette = false;

    generators: generatorKey[] = [
        'empty',
        'half',
        'diag',
        'circle',
        'quart',
        'dots',
        'cross',
        'opp',
        'let',
    ];

    filterBlur = 0;
    filterDesaturate = false;

    constructor() {
        makeAutoObservable(this);

        if (isServer) {
            this.ready = true;
            return;
        } else {
            this.persistStore();
        }
    }

    persistStore() {
        makePersistable(
            this,
            {
                name: 'ArtStore',
                properties: [
                    'randomSeed',
                    'numberOfRows',
                    'numberOfCols',
                    'blockSize',
                    'selectedPalette',
                    'generators',
                    'lockedSeed',
                    'lockedPalette',
                    'filterBlur',
                ],
            },
            {
                delay: 200,
                fireImmediately: true,
            }
        ).then(() => {
            this.setReady();
        });
    }

    hydrate({
        blockSize,
        generators,
        numberOfCols,
        numberOfRows,
        randomSeed,
        selectedPalette,
    }: HydrateStoreProps): void {
        this.blockSize = blockSize;
        this.generators = generators;
        this.numberOfCols = numberOfCols;
        this.numberOfRows = numberOfRows;
        this.randomSeed = randomSeed;
        this.selectedPalette = selectedPalette;

        this.setReady();
    }

    setReady() {
        this.ready = true;
    }

    setLockedSeed(state: boolean) {
        this.lockedSeed = state;
    }

    setLockedPalette(state: boolean) {
        this.lockedPalette = state;
    }

    setRandomSeed(seed: number | null): void {
        this.randomSeed = seed;
    }

    setBlockSize(size?: number): void {
        if (!size || size < 1) {
            this.blockSize = 1;
        } else {
            this.blockSize = size;
        }
    }

    setRowSize(size?: number): void {
        if (!size || size < 1) {
            this.numberOfRows = 1;
        } else {
            this.numberOfRows = size;
        }
    }
    setColSize(size?: number): void {
        if (!size || size < 1) {
            this.numberOfCols = 1;
        } else {
            this.numberOfCols = size;
        }
    }

    setSelectedPalette(palette: string | null): void {
        this.selectedPalette = palette;
    }

    setGenerators(keys?: generatorKey[]): void {
        if (!keys || keys.length === 0) {
            this.generators = ['empty'];
        } else {
            this.generators = keys;
        }
    }

    setFilterBlur(input: number): void {
        this.filterBlur = input;
    }

    setFilterDesaturate(state: boolean): void {
        this.filterDesaturate = state;
    }

    randomize(): void {
        if (!this.lockedSeed) {
            this.randomSeed = new Randomizer().int();
        }
        if (!this.lockedPalette) {
            this.selectedPalette = new Randomizer().choice(
                paletteChoices
            ).value;
        }
    }

    get viewBox() {
        return `0 0 ${this.numberOfCols * this.blockSize} ${
            this.numberOfRows * this.blockSize
        }`;
    }

    get size() {
        return {
            width: this.numberOfCols * this.blockSize,
            height: this.numberOfRows * this.blockSize,
        };
    }

    get filters(): GeneratorFilters {
        return {
            filterBlur: this.filterBlur,
            filterDesaturate: this.filterDesaturate,
            enabled: this.filterBlur > 0 || this.filterDesaturate,
        };
    }

    get palette() {
        const found =
            this.selectedPalette !== null
                ? paletteChoices.find((p) => p.value === this.selectedPalette)
                : null;
        return found || (this.random.choice(paletteChoices) as PaletteChoice);
    }

    get paletteColors() {
        return this.palette.colors as unknown as string[];
    }

    get generatorKeys() {
        return toJS(this.generators).sort();
    }

    get random() {
        if (this.randomSeed === null) {
            return new Randomizer();
        }
        return new Randomizer(this.randomSeed);
    }

    get blocks(): Array<Block> {
        this.random.reset();

        return generateBlocksObjects(
            this.numberOfRows,
            this.numberOfCols,
            this.blockSize,
            this.generatorKeys,
            this.paletteColors,
            this.random,
            AVAILABLE_CHARACTERS
        );
    }
}
