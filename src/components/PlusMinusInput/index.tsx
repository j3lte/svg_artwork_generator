import { NumberInputHandlers, InputWrapper, Group, Button, NumberInput } from '@mantine/core';
import { ReactNode, useRef } from 'react';
import { Minus, Plus } from 'tabler-icons-react';

interface PlusMinusInputProps {
    inputID: string;
    label: string;
    value: number;
    onChange: (val?: number) => void
    min?: number;
    step?: number;
    max?: number;
    precision?: number;
    icon?: ReactNode;
}

export const PlusMinusInput = ({ inputID, label, value, onChange, min, max, step, precision, icon }: PlusMinusInputProps) => {
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
                <Button size={'sm'} variant="default" onClick={() => handlers.current?.decrement()}>
                    <Minus size={12} />
                </Button>

                <NumberInput
                    id={inputID}
                    hideControls
                    value={value}
                    onChange={onChange}
                    handlersRef={handlers}
                    precision={precision}
                    size='sm'
                    max={max}
                    min={min}
                    step={step}
                    sx={() => ({
                        flexGrow: 1, // Why is this not working on styles??
                    })}
                    icon={icon}
                    styles={(theme) => ({
                        icon: {
                            pointerEvents: 'all',
                            cursor: 'pointer',
                            ':hover': {
                                color: theme.colors.dark
                            }
                        },
                        // input: { textAlign: 'center' }
                    })}
                />

                <Button size={'sm'} variant="default" onClick={() => handlers.current?.increment()} >
                    <Plus size={12} />
                </Button>
            </Group>
        </InputWrapper>
    )
}
