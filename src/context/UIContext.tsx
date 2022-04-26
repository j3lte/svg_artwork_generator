import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface UIContextInterface {
    drawerOpened: boolean;
    accordionState: number;
    setDrawerOpened: (state: boolean) => void;
    setAccordionState: (state: number) => void;
}

// @ts-ignore
const UIContext = createContext<UIContextInterface>({});

export const UIProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [drawerOpened, setDrawerOpened] = useState(false);
    const [accordionState, setAccordionState] = useState(-1);

    const contextValue = useMemo(() => ({
        drawerOpened,
        accordionState,
        setDrawerOpened,
        setAccordionState
    }), [drawerOpened, setDrawerOpened, accordionState, setAccordionState])

    return (
        <UIContext.Provider value={contextValue}>
            {children}
        </UIContext.Provider>
    )
};

export const useUIContext = () => useContext(UIContext);
