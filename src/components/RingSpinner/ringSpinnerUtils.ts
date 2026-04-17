export const TTL_SECONDS = 120;

export const RING_SPINNER_DEFAULT_SIZE = 24;
export const RING_SPINNER_STROKE = 2;

export function getRingGeometry(size: number): {
    r: number;
    circumference: number;
    cx: number;
    cy: number;
} {
    const s = size > 0 ? size : RING_SPINNER_DEFAULT_SIZE;
    const r = s / 2 - RING_SPINNER_STROKE - 1;
    const circumference = 2 * Math.PI * r;
    return { r, circumference, cx: s / 2, cy: s / 2 };
}
