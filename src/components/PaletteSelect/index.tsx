import { ComponentPropsWithoutRef, forwardRef, useMemo } from "react";
import { observer } from 'mobx-react'
import { Group, Text, Select, ColorSwatch, Button } from '@mantine/core';
import { paletteChoices } from "@/util/palette";
import { useStoreContext } from "@/context/StoreContext";
import { Lock, LockOpen, Refresh } from "tabler-icons-react";
import { Randomizer } from "@/util/random";

const ColorGroup = ({ colors }: { colors: string[] }) => (
    <Group spacing={0}>
        {colors.map((c, i) => (<ColorSwatch size={10} key={`${c}-${i}`} color={c} radius={0} />))}
    </Group>
)

interface PaletteItemProps extends ComponentPropsWithoutRef<'div'> {
    label: string
    colors: Array<string>
}

const SelectPalette = forwardRef<HTMLDivElement, PaletteItemProps>(
    ({ label, colors, ...others }: PaletteItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <ColorGroup colors={colors} />
                <Text size={'xs'}>{label}</Text>
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
                itemComponent={SelectPalette}
                disabled={store.lockedPalette}
                data={data}
                value={store.selectedPalette}
                onChange={(selected) => {
                    const valid = selected !== null ? data.findIndex(d => d.value === selected) !== -1 : true;
                    if (valid) {
                        store.setSelectedPalette(selected)
                    }
                }}
                icon={
                    <Refresh size={18} onClickCapture={onRefresh} />
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
