import { css } from 'react-strict-dom';

export const styles = css.create({
    root: {
        display: 'inline-flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 0,
        backgroundColor: 'transparent',
        overflow: 'visible',
    },
    rootSize: (size: number) => ({
        width: `${size}px`,
        height: `${size}px`,
    }),
    svg: {
        display: 'block',
        overflow: 'visible',
    },
});
