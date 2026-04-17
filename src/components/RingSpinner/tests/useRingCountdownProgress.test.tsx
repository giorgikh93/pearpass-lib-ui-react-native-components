import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { useRingCountdownProgress } from '../useRingCountdownProgress';

describe('useRingCountdownProgress', () => {
    let rafId = 0;
    const queued = new Map<number, FrameRequestCallback>();

    const flushOneRaf = (): void => {
        const snapshot = Array.from(queued.entries());
        snapshot.forEach(([id, cb]) => {
            queued.delete(id);
            cb(0);
        });
    };

    beforeEach(() => {
        rafId = 0;
        queued.clear();
        jest.spyOn(global, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
            const id = ++rafId;
            queued.set(id, cb);
            return id;
        });
        jest.spyOn(global, 'cancelAnimationFrame').mockImplementation((id: number) => {
            queued.delete(id);
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    function createProbe(seconds: number, onExpire?: () => void): {
        progressRef: React.MutableRefObject<number>;
        unmount: () => void;
    } {
        const progressRef: React.MutableRefObject<number> = { current: -1 };

        function Probe(): null {
            const p = useRingCountdownProgress(seconds, onExpire);
            progressRef.current = p;
            return null;
        }

        let root: renderer.ReactTestRenderer;
        act(() => {
            root = renderer.create(<Probe />);
        });

        return {
            progressRef,
            unmount: () => {
                act(() => {
                    root.unmount();
                });
            },
        };
    }

    it('starts at full progress for positive duration', () => {
        let now = 1_000_000;
        jest.spyOn(Date, 'now').mockImplementation(() => now);

        const { progressRef } = createProbe(5, jest.fn());
        expect(progressRef.current).toBe(1);
    });

    it('updates progress as wall clock approaches deadline', () => {
        let now = 1_000_000;
        jest.spyOn(Date, 'now').mockImplementation(() => now);

        const onExpire = jest.fn();
        const { progressRef } = createProbe(10, onExpire);

        act(() => {
            now = 1_000_000 + 5_000;
            flushOneRaf();
        });
        expect(progressRef.current).toBeCloseTo(0.5, 5);
        expect(onExpire).not.toHaveBeenCalled();
    });

    it('reaches zero and calls onExpire once when time is up', () => {
        let now = 1_000_000;
        jest.spyOn(Date, 'now').mockImplementation(() => now);

        const onExpire = jest.fn();
        const { progressRef } = createProbe(1, onExpire);

        act(() => {
            flushOneRaf();
        });
        expect(progressRef.current).toBe(1);

        act(() => {
            now = 1_000_000 + 1_000;
            flushOneRaf();
        });
        expect(progressRef.current).toBe(0);
        expect(onExpire).toHaveBeenCalledTimes(1);
    });

    it('sets progress to 0 and invokes onExpire when seconds is zero', () => {
        const onExpire = jest.fn();
        const { progressRef } = createProbe(0, onExpire);
        expect(progressRef.current).toBe(0);
        expect(onExpire).toHaveBeenCalledTimes(1);
    });

    it('does not throw when seconds is zero and onExpire is omitted', () => {
        const { progressRef } = createProbe(0, undefined);
        expect(progressRef.current).toBe(0);
    });

    it('cancels scheduled frames on unmount without calling onExpire', () => {
        let now = 1_000_000;
        jest.spyOn(Date, 'now').mockImplementation(() => now);

        const onExpire = jest.fn();
        const { unmount } = createProbe(60, onExpire);

        act(() => {
            unmount();
        });

        act(() => {
            now = 1_000_000 + 120_000;
            flushOneRaf();
        });

        expect(onExpire).not.toHaveBeenCalled();
    });
});
