# pearpass-lib-ui-react-native-components

A library of reusable React Native components designed for the Pearpass ecosystem mobile applications

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Security Notice](#security-notice)
- [Installation](#installation)
- [Usage Examples](#usage-examples)
- [Dependencies](#dependencies)
- [Related Projects](#related-projects)

## Features

- Prebuilt React Native components
- Fully customizable and themeable using `pearpass-lib-ui-theme-provider`.
- Optimized for performance and compatibility with modern React Native versions.

## Security Notice

1. To ensure the security and integrity of your projects, please note that official PearPass packages are distributed exclusively through our GitHub organization.
2. Any packages with similar names found on the npm registry or other third-party package managers are not affiliated with PearPass and should be strictly avoided. We recommend installing directly from this repository to ensure you are using the verified, open-source version.

## Installation

To install the library, use the following command:

```bash
npm install git+https://github.com/tetherto/pearpass-lib-ui-react-native-components.git
```

Ensure you have the required peer dependencies installed as well.

## Usage Examples

Here is a basic example of how to use a component from the library:

```jsx
import { ButtonPrimary } from '@tetherto/pearpass-lib-ui-react-native-components';

const App = () => {
    return <ButtonPrimary />;
};

export default App;
```

## Dependencies

This library has the following peer dependencies:

- [`react`](https://reactjs.org/)
- [`react-native`](https://reactnative.dev/)
- [`react-native-svg`](https://github.com/software-mansion/react-native-svg)
- [`styled-components`](https://styled-components.com/)

For a full list of dependencies, refer to the `package.json` file.

## Related Projects

- [@tetherto/pearpass-utils-password-check](https://github.com/tetherto/pearpass-utils-password-check): Utility functions for password validation.
- [@tetherto/tether-dev-docs](https://github.com/tetherto/tether-dev-docs): Shared ESLint configurations and development tools for Tether projects.
- [@tetherto/pearpass-lib-ui-theme-provider](https://github.com/tetherto/pearpass-lib-ui-theme-provider): Theme provider for consistent styling across Pearpass UI components.

## License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE](./LICENSE) file for details.