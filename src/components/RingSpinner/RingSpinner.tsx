import React from 'react';
import { html } from 'react-strict-dom';
import type { ThemeColors } from '../../theme/types';
import { styles } from './RingSpinner.styles';
import {
    getRingGeometry,
    TTL_SECONDS,
    RING_SPINNER_DEFAULT_SIZE,
    RING_SPINNER_STROKE,
} from './ringSpinnerUtils';
import { useRingCountdownProgress } from './useRingCountdownProgress';
import { useTheme } from '../../theme';

export interface RingSpinnerProps {
    /** When `null` or `undefined`, `theme.colors` is used. */
    colors?: ThemeColors | null;
    onExpire?: () => void;
    /** Countdown length in seconds. Defaults to {@link TTL_SECONDS}. */
    seconds?: number;
    /** Ring outer size in pixels. */
    size?: number;
}

export const RingSpinner = ({
    colors,
    onExpire,
    seconds = TTL_SECONDS,
    size = RING_SPINNER_DEFAULT_SIZE,
}: RingSpinnerProps): React.ReactElement => {
    const {theme} = useTheme();
    const progress = useRingCountdownProgress(seconds, onExpire);
    const { r, circumference, cx, cy } = getRingGeometry(size);
    const arcLen = progress * circumference;
    const palette = colors ?? theme.colors;
    return (
        <html.span aria-hidden={true} style={[styles.root, styles.rootSize(size)]}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                fill="none"
                style={styles.svg}
            >
                <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke={palette.colorBorderSecondary}
                    strokeWidth={RING_SPINNER_STROKE}
                />
                <g transform={`rotate(-90 ${cx} ${cy})`}>
                    <circle
                        cx={cx}
                        cy={cy}
                        r={r}
                        fill="none"
                        stroke={palette.colorPrimary}
                        strokeWidth={RING_SPINNER_STROKE}
                        strokeLinecap="round"
                        strokeDasharray={`${arcLen} ${circumference}`}
                    />
                </g>
            </svg>
        </html.span>
    );
};
