import { Checkbox, InputWrapper } from "@mantine/core";
import { useDebouncedCallback } from "beautiful-react-hooks";
import { observer } from "mobx-react";
import { CircleX } from "tabler-icons-react";

import { PlusMinusInput } from "@/components/PlusMinusInput";
import { useStoreContext } from "@/context/StoreContext";

export const Adjustments = observer(() => {
    const store = useStoreContext();

    const onChange = useDebouncedCallback((value?: number) => {
        console.log(value);
        store.setFilterBlur(value || 0);
    });

    const clearBlur = () => {
        store.setFilterBlur(0)
    };

    return (
        <>
        <PlusMinusInput
            inputID={'blurInput'}
            label={'Blur'}
            min={0}
            step={0.005}
            precision={3}
            value={store.filterBlur}
            onChange={onChange}
            icon={
                <CircleX size={18} onClickCapture={clearBlur}  />
            }
        />
        <InputWrapper
            label={'Color'}
            mb={10}
            sx={{
                label: {
                    userSelect: 'none'
                }
            }}
        >
            <Checkbox
                mt={5}
                checked={store.filterDesaturate}
                onChange={(evt) => {
                    store.setFilterDesaturate(evt.currentTarget.checked)
                }}
                styles={{
                    input: { cursor: 'pointer' },
                    label: { cursor: 'pointer' }
                }}
                label="Desaturate"
            />
        </InputWrapper>

        </>
    )
});
