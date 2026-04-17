import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import type { ThemeColors } from '../../theme/types';
import {
    getRingGeometry,
    TTL_SECONDS,
    RING_SPINNER_DEFAULT_SIZE,
    RING_SPINNER_STROKE,
} from './ringSpinnerUtils';
import { useRingCountdownProgress } from './useRingCountdownProgress';
import { useTheme } from '../../theme';

export interface RingSpinnerProps {
    colors?: ThemeColors | null;
    onExpire?: () => void;
    seconds?: number;
    size?: number;
}

const nativeStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
    },
});

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
        <View style={[nativeStyles.root, { width: size, height: size }]} accessibilityElementsHidden={true}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <Circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke={palette.colorBorderSecondary}
                    strokeWidth={RING_SPINNER_STROKE}
                />
                <G transform={`rotate(-90 ${cx} ${cy})`}>
                    <Circle
                        cx={cx}
                        cy={cy}
                        r={r}
                        fill="none"
                        stroke={palette.colorPrimary}
                        strokeWidth={RING_SPINNER_STROKE}
                        strokeLinecap="round"
                        strokeDasharray={`${arcLen} ${circumference}`}
                    />
                </G>
            </Svg>
        </View>
    );
};
