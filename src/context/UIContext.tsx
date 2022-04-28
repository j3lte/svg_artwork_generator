import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

export type XYCoordinate = { x: number, y: number };
interface UIContextInterface {
    drawerOpened: boolean;
    setDrawerOpened: (state: boolean) => void;

    accordionState: number;
    setAccordionState: (state: number) => void;

    activePaletteTab: number;
    setActivePaletteTab: (state: number) => void;

    paletteScrollPosition: XYCoordinate;
    onPaletteScrollPositionChange: (state: XYCoordinate) => void;
}

// @ts-ignore
const UIContext = createContext<UIContextInterface>({});

export const UIProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [drawerOpened, setDrawerOpened] = useState(false);
    const [accordionState, setAccordionState] = useState(-1);

    const [activePaletteTab, setActivePaletteTabInternal] = useState(0);
    const [paletteScrollPosition, onPaletteScrollPositionChange] = useState({ x: 0, y: 0 });

    const setActivePaletteTab = (state: number) => {
        onPaletteScrollPositionChange({ x: 0, y: 0 });
        setActivePaletteTabInternal(state);
    }

    const contextValue = useMemo(() => ({
        drawerOpened,
        setDrawerOpened,

        accordionState,
        setAccordionState,

        activePaletteTab,
        setActivePaletteTab,

        paletteScrollPosition,
        onPaletteScrollPositionChange
    }), [drawerOpened, accordionState, activePaletteTab, paletteScrollPosition])

    return (
        <UIContext.Provider value={contextValue}>
            {children}
        </UIContext.Provider>
    )
};

export const useUIContext = () => useContext(UIContext);
