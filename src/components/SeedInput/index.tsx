import { Button, Group, NumberInput } from '@mantine/core';
import { useDebouncedCallback } from 'beautiful-react-hooks';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Lock, LockOpen, Refresh } from 'tabler-icons-react';

import { Randomizer } from '@/util/random';
import { useStoreContext } from '@/context/StoreContext';

export const SeedInput = observer(() => {
    const store = useStoreContext();

    const onChange = useDebouncedCallback((value?: number) => {
        store.setRandomSeed(value ? value : null);
    });

    const onRefresh = () => {
        const random = new Randomizer().int();
        store.setRandomSeed(random);
    };

    const lockIcon = useMemo(() => store.lockedSeed ? (<Lock size={20} />) : (<LockOpen size={20} />), [store.lockedSeed])
    const flickLock = () => {
        store.setLockedSeed(!store.lockedSeed);
    }

    return (
        <Group noWrap align={'end'}>
            <NumberInput
                size="sm"
                hideControls
                value={store.randomSeed === null ? undefined : store.randomSeed}
                disabled={store.lockedSeed}
                placeholder="Random Seed"
                label="Random Seed"
                onChange={onChange}
                icon={
                    <Refresh size={18} onClickCapture={onRefresh} />
                }
                sx={{ flexGrow: 1 }}
                styles={(theme) => ({
                    icon: store.lockedSeed ? {} : {
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
                color={store.lockedSeed ? 'orange' : 'gray'}
                onClick={flickLock}
                >
                {lockIcon}
            </Button>
        </Group>
    )
});
