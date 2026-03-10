import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { css, html } from 'react-strict-dom'
import { Radio } from './Radio'
import { tokens } from '../../theme/tokens.css'

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    controls: {
      include: ['options', 'value', 'disabled']
    }
  }
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

const storyStyles = css.create({
  container: {
    width: '80%'
  },
  stack: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing20
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing12
  },
  sectionTitle: {
    fontFamily: tokens.fontPrimary,
    fontSize: tokens.fontSize12,
    fontWeight: tokens.weightMedium,
    color: tokens.colorTextPrimary,
    textTransform: 'capitalize'
  }
})

const defaultOptions = [
  {
    value: 'option1',
    label: 'Option 1',
    description: 'This is a description for option 1'
  },
  {
    value: 'option2',
    label: 'Option 2',
    description: 'This is a description for option 2'
  },
  { value: 'option3', label: 'Option 3' }
]

export const Playground: Story = {
  decorators: [
    (Story) => (
      <html.div style={storyStyles.container}>
        <Story />
      </html.div>
    )
  ],
  args: {
    options: defaultOptions,
    value: 'option1'
  }
}

export const States: Story = {
  args: {
    options: defaultOptions,
    value: 'option1'
  },
  parameters: {
    controls: { disable: true }
  },
  render: () => {
    const [selected, setSelected] = React.useState('option1')
    return (
      <html.div style={storyStyles.stack}>
        <html.div style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>Interactive</html.div>
          <Radio
            options={defaultOptions}
            value={selected}
            onChange={setSelected}
          />
        </html.div>

        <html.div style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>Disabled</html.div>
          <Radio options={defaultOptions} value="option1" disabled />
        </html.div>

        <html.div style={storyStyles.section}>
          <html.div style={storyStyles.sectionTitle}>
            Per-option Disabled
          </html.div>
          <Radio
            options={[
              {
                value: 'a',
                label: 'Enabled option',
                description: 'Can be selected'
              },
              {
                value: 'b',
                label: 'Disabled option',
                description: 'Cannot be selected',
                disabled: true
              }
            ]}
            value="a"
            onChange={() => {}}
          />
        </html.div>
      </html.div>
    )
  }
}
