import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Radio } from './Radio'

jest.mock('./Radio.styles', () => ({
  styles: {
    root: {},
    optionWrapper: {},
    optionWrapperDisabled: {},
    ring: {},
    ringChecked: {},
    ringUnchecked: {},
    ringDisabled: {},
    ringEnabled: {},
    dot: {},
    details: {},
    label: {},
    description: {}
  }
}))

jest.mock('./Radio.config', () => ({
  ringStateStyleMap: {
    checked: {},
    unchecked: {}
  },
  ringDisabledStyleMap: {
    disabled: {},
    enabled: {}
  }
}))

const options = [
  { value: 'a', label: 'Option A', description: 'Description A' },
  { value: 'b', label: 'Option B' }
]

describe('Radio', () => {
  it('renders all options and matches snapshot', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Radio options={options} value="a" onChange={() => {}} />
      )
    })

    expect(component!.toJSON()).toMatchSnapshot()
  })

  it('marks the correct option as checked', () => {
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Radio options={options} value="a" onChange={() => {}} />
      )
    })

    const radioItems = component!.root.findAllByProps({ role: 'radio' })
    expect(radioItems[0].props['aria-checked']).toBe(true)
    expect(radioItems[1].props['aria-checked']).toBe(false)
  })

  it('calls onChange with the selected value when an option is clicked', () => {
    const onChange = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Radio options={options} value="a" onChange={onChange} />
      )
    })

    const radioItems = component!.root.findAllByProps({ role: 'radio' })
    act(() => {
      radioItems[1].props.onClick?.({})
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('does not call onChange when the group is disabled', () => {
    const onChange = jest.fn()
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Radio options={options} value="a" onChange={onChange} disabled />
      )
    })

    const radioItems = component!.root.findAllByProps({ role: 'radio' })
    expect(radioItems[0].props.onClick).toBeUndefined()
    expect(radioItems[1].props.onClick).toBeUndefined()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('does not call onChange for a per-option disabled item', () => {
    const onChange = jest.fn()
    const mixedOptions = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B', disabled: true }
    ]
    let component: renderer.ReactTestRenderer

    act(() => {
      component = renderer.create(
        <Radio options={mixedOptions} value="a" onChange={onChange} />
      )
    })

    const radioItems = component!.root.findAllByProps({ role: 'radio' })
    expect(radioItems[1].props.onClick).toBeUndefined()
    expect(radioItems[1].props['aria-disabled']).toBe(true)
    expect(onChange).not.toHaveBeenCalled()
  })
})
