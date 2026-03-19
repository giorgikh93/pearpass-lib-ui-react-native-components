import React from 'react'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { NativeBottomSheet } from '../NativeBottomSheet'

export type DropdownProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  testID?: string
}

export const Dropdown: React.FC<DropdownProps> = ({ trigger, children, testID }) => {
  // TS workaround: some build/JSX resolutions treat `NativeBottomSheet` as having no props.
  // Casting keeps runtime behavior identical while unblocking the TS compile.
  const BottomSheetComponent = NativeBottomSheet as unknown as React.ComponentType<DropdownProps>

  return (
    <BottomSheetComponent trigger={trigger} testID={testID}>
      <BottomSheetScrollView>{children}</BottomSheetScrollView>
    </BottomSheetComponent>
  )
}

Dropdown.displayName = 'Dropdown'
