import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { css, html } from 'react-strict-dom';
import { RingSpinner } from './RingSpinner';
import { darkTheme } from '../../theme/themes/dark';
import type { ThemeColors } from '../../theme/types';
import { tokens } from '../../theme/tokens.css';
import { Text } from '../Text';

/** Full `ThemeColors` with obvious track + arc hues for Storybook (vs default lime / olive). */
const storyCustomRingColors: ThemeColors = {
    ...darkTheme.colors,
    colorBorderSecondary: '#6B4C9A',
    colorPrimary: '#FF6B35',
};

const meta = {
    title: 'Components/RingSpinner',
    component: RingSpinner,
    tags: ['autodocs'],
    args: {
        colors: darkTheme.colors,
        seconds: 120,
        size: 24,
        onExpire: () => {},
    },
    argTypes: {
        colors: { control: false },
        onExpire: { action: 'expired' },
        seconds: { control: { type: 'number', min: 1, max: 600, step: 1 } },
        size: { control: { type: 'number', min: 16, max: 48, step: 1 } },
    },
} satisfies Meta<typeof RingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyStyles = css.create({
    panel: {
        padding: tokens.spacing24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: tokens.spacing16,
        backgroundColor: tokens.colorSurfacePrimary,
        borderRadius: tokens.radius8,
    },
    caption: {
        fontFamily: tokens.fontPrimary,
        fontSize: tokens.fontSize12,
        color: tokens.colorTextSecondary,
    },
    inlineCode: {
        fontFamily: 'ui-monospace, monospace',
        fontSize: tokens.fontSize12,
        color: tokens.colorTextPrimary,
    },
});

export const Playground: Story = {
    render: (args) => (
        <html.div style={storyStyles.panel}>
            <Text variant="caption" style={storyStyles.caption}>
                Ring depletes as the countdown runs; default duration is 120 seconds.
            </Text>
            <RingSpinner {...args} />
        </html.div>
    ),
};

export const ShortCountdown: Story = {
    args: {
        seconds: 15,
        onExpire: () => {
            console.log('expired');
        },
    },
    parameters: {
        controls: { disable: true },
    },
    render: (args) => (
        <html.div style={storyStyles.panel}>
            <Text variant="caption" style={storyStyles.caption}>
                15 seconds for quick testing of onExpire.
            </Text>
            <RingSpinner {...args} />
        </html.div>
    ),
};

export const CustomColors: Story = {
    args: {
        colors: storyCustomRingColors,
        seconds: 60,
    },
    parameters: {
        controls: { disable: true },
    },
    render: (args) => (
        <html.div style={storyStyles.panel}>
            <Text variant="caption" style={storyStyles.caption}>
                Custom palette: purple track (#6B4C9A), orange arc (#FF6B35). Pass a full{' '}
                <html.span style={storyStyles.inlineCode}>ThemeColors</html.span> (e.g. spread{' '}
                <html.span style={storyStyles.inlineCode}>darkTheme.colors</html.span> then override{' '}
                <html.span style={storyStyles.inlineCode}>colorBorderSecondary</html.span> and{' '}
                <html.span style={storyStyles.inlineCode}>colorPrimary</html.span>).
            </Text>
            <RingSpinner {...args} />
        </html.div>
    ),
};
