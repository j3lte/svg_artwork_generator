import { useStoreContext } from '@/context/StoreContext';
import { flatLabelMapping, generatorKey } from '@/util/generators';
import { CheckboxGroup, Checkbox, Text, Badge, Group } from '@mantine/core';
import { observer } from 'mobx-react';
import { useMemo } from 'react';

export const BlocksSelector = observer(() => {
    const store = useStoreContext();

    const flatCheckBoxes = useMemo(() => (
        flatLabelMapping.map(({ value, label, type, group }, index, arr) => (
            <Checkbox
                key={`flat_${value}`}
                value={value}
                label={
                    <Group noWrap sx={{ gap: 3 }}>
                        <Badge size='xs' color={type === '1C' ? 'gray' : 'teal'} sx={{ pointerEvents: 'none', userSelect: 'none', cursor: 'pointer' }}>{type}</Badge>
                        <Text size='sm'>{label}</Text>
                    </Group>
                }
                sx={() => ({
                    position: 'relative',
                    marginTop: (index === 0 || (index !== 0 && arr[index-1].group !== group)) ? 15 : 5,
                    '::before': ((index !== 0 && arr[index-1].group !== group) ? {
                        content: '" "',
                        position: 'absolute',
                        top: -9,
                        left: 0,
                        height: 1,
                        width: 50,
                        background: '#D6D6D6'
                    } : {})
                })}
            />
        ))
    ), [])

    return (
        <CheckboxGroup
            value={store.generatorKeys}
            orientation='vertical'
            required
            spacing={5}
            size='sm'
            onChange={(values: generatorKey[]) => {
                store.setGenerators(values);
            }}
            styles={() => ({
                input: {
                    cursor: 'pointer'
                },
                label: {
                    cursor: 'pointer',
                }
            })}
        >
            {flatCheckBoxes}
        </CheckboxGroup>
    )
});
