import { ComponentPropsWithoutRef, forwardRef, useMemo } from "react";
import { observer } from 'mobx-react'
import { Group, Text, Select, Button } from '@mantine/core';
import { ChevronDown, Lock, LockOpen, Refresh } from "tabler-icons-react";

import { paletteChoices } from "@/util/palette";
import { useStoreContext } from "@/context/StoreContext";
import { Randomizer } from "@/util/random";

// const ColorGroup = ({ colors }: { colors: string[] }) => {
//     const colorArray = (new Array(5)).fill(null).map((c, i) => colors[i] ? colors[i] : null);

//     return (
//         <Group spacing={0}>
//             {colorArray.map((c, i) => (<ColorSwatch size={10} key={`${c ? c : 'empty'}-${i}`} color={c || '#FFF'} radius={0} sx={{ opacity: c === null ? 0 : 1 }} />))}
//         </Group>
//     )
// }

interface PaletteItemProps extends ComponentPropsWithoutRef<'div'> {
    label: string
    colors: Array<string>
}

const SelectPalette = forwardRef<HTMLDivElement, PaletteItemProps>(
    ({ label, ...others }: PaletteItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                {/* <ColorGroup colors={colors} /> */}
                <Text size={'xs'} sx={{ textOverflow: 'ellipsis', whiteSpace: "nowrap", overflow: 'hidden' }}>{label}</Text>
            </Group>
        </div>
    )
);

SelectPalette.displayName = 'SelectPalette';

export const PaletteSelect = observer(() => {
    const data = useMemo(() => paletteChoices, []);
    const store = useStoreContext();

    const onRefresh = () => {
        const newChoice = new Randomizer().choice(data);
        store.setSelectedPalette(newChoice.value);
    }

    const lockIcon = useMemo(() => store.lockedPalette ? (<Lock size={20} />) : (<LockOpen size={20} />), [store.lockedPalette])
    const flickLock = () => {
        store.setLockedPalette(!store.lockedPalette);
    }

    return (
        <Group noWrap align={"end"}>
            <Select
                label="Select palette"
                placeholder="Pick one"
                size="sm"
                maxDropdownHeight={250}
                searchable
                limit={100}
                nothingFound='Nothing found'
                itemComponent={SelectPalette}
                disabled={store.lockedPalette}
                rightSection={<ChevronDown size={14} />}
                data={data}
                withinPortal
                value={store.selectedPalette}
                filter={(value, item) =>
                    item.label?.toLowerCase().includes(value.toLowerCase().trim()) || false
                }
                onChange={(selected) => {
                    const valid = selected !== null ? data.findIndex(d => d.value === selected) !== -1 : true;
                    if (valid) {
                        store.setSelectedPalette(selected)
                    }
                }}
                icon={
                    <Refresh size={18} onClickCapture={onRefresh} />
                }
                classNames={{
                    dropdown: 'dropdown-dirty-hack'
                }}
                sx={{
                    flexGrow: 1
                }}
                styles={(theme) => ({
                    icon: store.lockedPalette ? {} : {
                        pointerEvents: 'auto',
                        cursor: 'pointer',
                        ':hover': {
                            color: theme.black
                        }
                    },
                    item: {
                        overflow: 'hidden',
                        width: '100%'
                    }
                })}
            />
            <Button
                size="sm" pl={5} pr={5}
                variant="subtle"
                color={store.lockedPalette ? 'orange' : 'gray'}
                onClick={flickLock}
                >
                {lockIcon}
            </Button>
        </Group>
)
})
