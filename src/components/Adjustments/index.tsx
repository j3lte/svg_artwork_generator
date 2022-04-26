import { Checkbox, Group, NumberInput } from "@mantine/core";
import { useDebouncedCallback } from "beautiful-react-hooks";
import { observer } from "mobx-react";
import { CircleX } from "tabler-icons-react";

import { useStoreContext } from "@/context/StoreContext";

export const Adjustments = observer(() => {
    const store = useStoreContext();

    const onChange = useDebouncedCallback((value?: number) => {
        store.setFilterBlur(value || 0);
    });

    const clearBlur = () => {
        store.setFilterBlur(0)
    };

    return (
        <>
        <Group noWrap align={"end"}>
            <NumberInput
                size="sm"
                defaultValue={0.05}
                precision={3}
                min={0}
                step={0.005}
                value={store.filterBlur}
                placeholder="Blur"
                label="Blur"
                onChange={onChange}
                icon={
                    <CircleX size={18} onClickCapture={clearBlur}  />
                }
                sx={{ flexGrow: 1 }}
                styles={(theme) => ({
                    icon: {
                        pointerEvents: 'auto',
                        cursor: 'pointer',
                        ':hover': {
                            color: theme.black
                        }
                    }
                })}
            />
        </Group>
        <Checkbox
            mt={15}
            checked={store.filterDesaturate}
            onChange={(evt) => {
                store.setFilterDesaturate(evt.currentTarget.checked)
            }}
            label="Desaturate"
        />
        </>
    )
});
