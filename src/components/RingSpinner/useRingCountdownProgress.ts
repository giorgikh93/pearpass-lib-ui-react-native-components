import * as React from 'react';

/**
 * Fraction of time remaining in `0…1`, updated each animation frame from a wall-clock deadline.
 */
export function useRingCountdownProgress(seconds: number, onExpire?: () => void): number {
    const [progress, setProgress] = React.useState(() => (seconds > 0 ? 1 : 0));
    const onExpireRef = React.useRef(onExpire);
    const expiredRef = React.useRef(false);

    onExpireRef.current = onExpire;

    React.useEffect(() => {
        const totalMs = Math.max(0, seconds) * 1000;

        if (totalMs <= 0) {
            setProgress(0);
            if (!expiredRef.current) {
                expiredRef.current = true;
                onExpireRef.current?.();
            }
            return undefined;
        }

        expiredRef.current = false;
        setProgress(1);

        const deadline = Date.now() + totalMs;
        let rafId = 0;
        let cancelled = false;

        const tick = (): void => {
            if (cancelled) return;
            const remainingMs = deadline - Date.now();  
            if (remainingMs <= 0) {
                setProgress(0);
                if (!expiredRef.current) {
                    expiredRef.current = true;
                    onExpireRef.current?.();
                }
                return;
            }
            setProgress(remainingMs / totalMs);
            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => {
            cancelled = true;
            cancelAnimationFrame(rafId);
        };
    }, [seconds]);

    return progress;
}
