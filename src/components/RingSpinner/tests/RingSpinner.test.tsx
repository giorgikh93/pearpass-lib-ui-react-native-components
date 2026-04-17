import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Circle } from 'react-native-svg';
import { RingSpinner } from '../RingSpinner';
import { getRingGeometry } from '../ringSpinnerUtils';
import { darkTheme } from '../../../theme/themes/dark';
import { useRingCountdownProgress } from '../useRingCountdownProgress';

jest.mock('../useRingCountdownProgress');

jest.mock('../RingSpinner.styles', () => ({
    styles: {
        root: {},
        rootSize: () => ({}),
        svg: {},
    },
}));

const mockUseRingCountdownProgress = useRingCountdownProgress as jest.MockedFunction<
    typeof useRingCountdownProgress
>;

describe('RingSpinner', () => {
    beforeEach(() => {
        mockUseRingCountdownProgress.mockReturnValue(0.75);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('passes seconds and onExpire into the countdown hook', () => {
        const onExpire = jest.fn();

        act(() => {
            renderer.create(
                <RingSpinner colors={darkTheme.colors} onExpire={onExpire} seconds={30} />
            );
        });

        expect(mockUseRingCountdownProgress).toHaveBeenCalledWith(30, onExpire);
    });

    it('uses default TTL when seconds is omitted', () => {
        const onExpire = jest.fn();

        act(() => {
            renderer.create(<RingSpinner colors={darkTheme.colors} onExpire={onExpire} />);
        });

        expect(mockUseRingCountdownProgress).toHaveBeenCalledWith(120, onExpire);
    });

    it('renders arc strokeDasharray from hook progress and geometry', () => {
        mockUseRingCountdownProgress.mockReturnValue(0.5);
        const size = 24;
        const { circumference } = getRingGeometry(size);
        const expectedArc = 0.5 * circumference;

        let root: renderer.ReactTestRenderer;
        act(() => {
            root = renderer.create(
                <RingSpinner colors={darkTheme.colors} onExpire={jest.fn()} size={size} />
            );
        });

        const circles = root!.root.findAllByType(Circle);
        expect(circles).toHaveLength(2);
        const dash = circles[1].props.strokeDasharray;
        const [arcPart, gapPart] = Array.isArray(dash)
            ? dash.map((x: string | number) => Number(x))
            : String(dash)
                  .split(/[\s,]+/)
                  .map(Number);
        expect(arcPart).toBeCloseTo(expectedArc, 5);
        expect(gapPart).toBeCloseTo(circumference, 5);
    });

    it('matches snapshot with mocked countdown', () => {
        let component: renderer.ReactTestRenderer;
        act(() => {
            component = renderer.create(
                <RingSpinner colors={darkTheme.colors} onExpire={jest.fn()} seconds={60} />
            );
        });
        expect(component!.toJSON()).toMatchSnapshot();
    });
});
