import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface UIContextInterface {
    drawerOpened: boolean;
    accordionState: number;
    setDrawerOpened: (state: boolean) => void;
    setAccordionState: (state: number) => void;
    activePaletteTab: number;
    setActivePaletteTab: (state: number) => void;
}

// @ts-ignore
const UIContext = createContext<UIContextInterface>({});

export const UIProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [drawerOpened, setDrawerOpened] = useState(false);
    const [accordionState, setAccordionState] = useState(-1);
    const [activePaletteTab, setActivePaletteTab] = useState(0);

    const contextValue = useMemo(() => ({
        drawerOpened,
        accordionState,
        setDrawerOpened,
        setAccordionState,
        activePaletteTab,
        setActivePaletteTab
    }), [drawerOpened, accordionState, activePaletteTab])

    return (
        <UIContext.Provider value={contextValue}>
            {children}
        </UIContext.Provider>
    )
};

export const useUIContext = () => useContext(UIContext);
