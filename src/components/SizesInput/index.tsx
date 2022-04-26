import { useStoreContext } from "@/context/StoreContext";
import { ActionIcon, Button, Group, InputWrapper, NumberInput, NumberInputHandlers, Space } from "@mantine/core";
import { useDebouncedCallback } from "beautiful-react-hooks";
import { observer } from "mobx-react";
import { useRef } from "react";
import { Minus, Plus } from "tabler-icons-react";
interface PlusMinusInputProps {
    inputID: string;
    label: string;
    value: number;
    onChange: (val?: number) => void
    min?: number;
    step?: number;
    max?: number;
}

const PlusMinusInput = ({ inputID, label, value, onChange, min, max, step }: PlusMinusInputProps) => {
    const handlers = useRef<NumberInputHandlers>();

    return (
        <InputWrapper
            id={inputID}
            label={label}
            mb={10}
            sx={{
                label: {
                    userSelect: 'none'
                }
            }}
        >
            <Group spacing={5} noWrap>
                <Button size={'sm'} variant="default" onClick={() => handlers.current?.decrement()} pl={8} pr={8}>
                    <Minus size={12} />
                </Button>

                <NumberInput
                    id={inputID}
                    hideControls
                    value={value}
                    onChange={onChange}
                    handlersRef={handlers}
                    size='sm'
                    max={max}
                    min={min}
                    step={step}
                    sx={{ flexGrow: 1 }}
                    styles={{ input: { textAlign: 'center' } }}
                />

                <Button size={'sm'} variant="default" onClick={() => handlers.current?.increment()}  pl={8} pr={8}>
                    <Plus size={12} />
                </Button>
            </Group>
        </InputWrapper>
    )
}

export const SizesInput = observer(() => {
    const store = useStoreContext();

    const onChangeBlockSize =   useDebouncedCallback((val?: number) => { store.setBlockSize(val) });
    const onChangeRowSize =     useDebouncedCallback((val?: number) => { store.setRowSize(val) });
    const onChangeColSize =     useDebouncedCallback((val?: number) => { store.setColSize(val) });

    return (
        <>
            <PlusMinusInput
                inputID={'blockSizeInput'}
                label={'Block size'}
                min={10}
                step={10}
                value={store.blockSize}
                onChange={onChangeBlockSize}
            />
            <PlusMinusInput
                inputID={'rowSizeInput'}
                label={'Rows'}
                min={1}
                value={store.numberOfRows}
                onChange={onChangeRowSize}
            />
            <PlusMinusInput
                inputID={'colSizeInput'}
                label={'Columns'}
                min={1}
                value={store.numberOfCols}
                onChange={onChangeColSize}
            />
        </>
    )
});
