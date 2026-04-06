import React from 'react'
import type { Preview } from '@storybook/react'
import { View, StyleSheet } from 'react-native'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { ThemeProvider } from '../../src/theme'

const rnStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#15180E',
    justifyContent: 'center',
    padding: 16
  }
})

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <BottomSheetModalProvider>
          <View style={rnStyles.container}>
            <Story />
          </View>
        </BottomSheetModalProvider>
      </ThemeProvider>
    )
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
