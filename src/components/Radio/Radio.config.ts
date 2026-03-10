import { styles } from './Radio.styles';

export const ringStateStyleMap = {
    checked: styles.ringChecked,
    unchecked: styles.ringUnchecked,
} satisfies Record<'checked' | 'unchecked', (typeof styles)[keyof typeof styles]>;

export const ringDisabledStyleMap = {
    disabled: styles.ringDisabled,
    enabled: styles.ringEnabled,
} satisfies Record<'disabled' | 'enabled', (typeof styles)[keyof typeof styles]>;
