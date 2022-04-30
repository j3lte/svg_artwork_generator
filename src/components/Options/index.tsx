import { Accordion, Space, ThemeIcon, useAccordionState } from '@mantine/core';
import { PaletteSelect } from '../PaletteSelect';
import { AdjustmentsHorizontal, BoxModel2, Palette, TiltShift } from 'tabler-icons-react';
import { SeedInput } from '../SeedInput';
import { SizesInput } from '../SizesInput';
import { BlocksSelector } from '../BlockSelector';
import { Adjustments } from '../Adjustments';

export const Options = ({ multiple }: { multiple?: boolean }) => {
    // const { accordionState, setAccordionState } = useUIContext();

    // // TODO: BUG, Accordion is set to -1 when closes;
    // const onChange = (newState: {[key: number]: boolean}) => {
    //     const newIndex = Object.values(newState).findIndex(i => i);
    //     if (newIndex !== -1) {
    //         setAccordionState(newIndex)
    //     }
    // }

    const [state, handlers] = useAccordionState({ total: 4 });

    return (
        <Accordion
            disableIconRotation
            state={state}
            multiple={multiple}
            onChange={handlers.setState}
        >
            <Accordion.Item
                label="Seed & Palette"
                icon={
                    <ThemeIcon color="violet" variant="light">
                        <Palette size={14} />
                    </ThemeIcon>
                }
            >
                <SeedInput />
                <Space h="xs" />
                <PaletteSelect />
                <Space h="xs" />
            </Accordion.Item>
            <Accordion.Item
                label="Sizes"
                icon={
                    <ThemeIcon color="green" variant="light">
                        <AdjustmentsHorizontal size={14} />
                    </ThemeIcon>
                }
            >
                <SizesInput />
            </Accordion.Item>
            <Accordion.Item
                label="Blocks"
                icon={
                    <ThemeIcon color="blue" variant="light">
                        <BoxModel2 size={14} />
                    </ThemeIcon>
                }
            >
                <BlocksSelector />
                <Space h="xs" />
            </Accordion.Item>
            <Accordion.Item
                label="Adjustments"
                icon={
                    <ThemeIcon color="orange" variant="light">
                        <TiltShift size={14} />
                    </ThemeIcon>
                }
            >
                <Adjustments />
            </Accordion.Item>
        </Accordion>
    )
}
