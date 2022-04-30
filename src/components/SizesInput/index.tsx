import { useDebouncedCallback } from "beautiful-react-hooks";
import { observer } from "mobx-react";
import { Refresh } from "tabler-icons-react";

import { PlusMinusInput } from "@/components/PlusMinusInput";
import { useStoreContext } from "@/context/StoreContext";

export const SizesInput = observer(() => {
    const store = useStoreContext();

    const onChangeBlockSize =   useDebouncedCallback((val?: number) => { store.setBlockSize(val) });
    const onChangeRowSize =     useDebouncedCallback((val?: number) => { store.setRowSize(val) });
    const onChangeColSize =     useDebouncedCallback((val?: number) => { store.setColSize(val) });

    const onRevertBlockSize =   useDebouncedCallback(() => { store.setBlockSize(100) });
    const onRevertRowSize =     useDebouncedCallback(() => { store.setRowSize(10) });
    const onRevertColSize =     useDebouncedCallback(() => { store.setColSize(10) });

    return (
        <>
            <PlusMinusInput
                inputID={'blockSizeInput'}
                label={'Block size'}
                min={10}
                step={10}
                value={store.blockSize}
                onChange={onChangeBlockSize}
                icon={
                    <Refresh size={18} onClickCapture={onRevertBlockSize} />
                }
            />
            <PlusMinusInput
                inputID={'rowSizeInput'}
                label={'Rows'}
                min={1}
                value={store.numberOfRows}
                onChange={onChangeRowSize}
                icon={
                    <Refresh size={18} onClickCapture={onRevertRowSize} />
                }
            />
            <PlusMinusInput
                inputID={'colSizeInput'}
                label={'Columns'}
                min={1}
                value={store.numberOfCols}
                onChange={onChangeColSize}
                icon={
                    <Refresh size={18} onClickCapture={onRevertColSize} />
                }
            />
        </>
    )
});
