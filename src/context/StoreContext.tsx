import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import { ArtStore } from '../store';

// @ts-ignore
const StoreContext = createContext<ArtStore>(null);

export const StoreProvider: FC<PropsWithChildren<{ store: ArtStore }>> = ({ store, children }) => {
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
};

export const useStoreContext = () => useContext(StoreContext);
