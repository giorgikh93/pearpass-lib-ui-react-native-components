import {
    getRingGeometry,
    RING_SPINNER_DEFAULT_SIZE,
    RING_SPINNER_STROKE,
    TTL_SECONDS,
} from '../ringSpinnerUtils';

describe('ringSpinnerUtils', () => {
    it('exposes default TTL and stroke constants', () => {
        expect(TTL_SECONDS).toBe(120);
        expect(RING_SPINNER_DEFAULT_SIZE).toBe(24);
        expect(RING_SPINNER_STROKE).toBe(2);
    });

    describe('getRingGeometry', () => {
        it('returns center and radius for default-sized ring', () => {
            const size = 24;
            const { r, cx, cy, circumference } = getRingGeometry(size);
            expect(cx).toBe(12);
            expect(cy).toBe(12);
            expect(r).toBe(size / 2 - RING_SPINNER_STROKE - 1);
            expect(circumference).toBeCloseTo(2 * Math.PI * r, 10);
        });

        it('scales with custom size', () => {
            const size = 48;
            const { r, cx, cy } = getRingGeometry(size);
            expect(cx).toBe(24);
            expect(cy).toBe(24);
            expect(r).toBe(size / 2 - RING_SPINNER_STROKE - 1);
        });

        it('falls back to default size when size is zero', () => {
            const { cx, cy } = getRingGeometry(0);
            expect(cx).toBe(RING_SPINNER_DEFAULT_SIZE / 2);
            expect(cy).toBe(RING_SPINNER_DEFAULT_SIZE / 2);
        });
    });
});
