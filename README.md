# useFullscreen React Hook

A custom React hook to handle fullscreen toggling for HTML elements in a React project. This hook allows you to easily manage fullscreen state, with support for entering and exiting fullscreen, as well as toggling between fullscreen and normal modes.

## Installation

You can install the package via npm or yarn:

```bash
npm install use-fullscreen
```

Or with Yarn:

```bash
yarn add use-fullscreen
```

## Usage

To use this hook, you need to import it into your React component, create a ref for the element you want to control, and call the hook with that ref.

### Example

```tsx
import React, { useRef } from "react";
import useFullscreen from "use-fullscreen";

const FullscreenComponent = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, enter, exit, toggle } = useFullscreen(elementRef);

  return (
    <div>
      <div
        ref={elementRef}
        style={{ width: "100%", height: "300px", backgroundColor: "lightblue" }}
      >
        <h2>This is a full-screenable element!</h2>
      </div>
      <button onClick={toggle}>
        {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      </button>
    </div>
  );
};

export default FullscreenComponent;
```

## Hook API

```ts
interface FullscreenApi {
  isFullscreen: boolean;
  enter: () => void;
  exit: () => void;
  toggle: () => void;
}

function useFullscreen(elementRef: React.RefObject<HTMLElement>): FullscreenApi;
```

### `isFullscreen: boolean`

A boolean value that indicates whether the element is currently in fullscreen mode.

### `enter: () => void`

Function to request the element to enter fullscreen mode.

### `exit: () => void`

Function to exit fullscreen mode.

### `toggle: () => void`

Function to toggle between fullscreen and normal mode. If the element is in fullscreen, it exits fullscreen; if it's not in fullscreen, it enters fullscreen.

## Supported Browsers

The hook supports all modern browsers that support the Fullscreen API. This includes:

- Chrome
- Firefox
- Safari
- Edge

Older browsers may not fully support the Fullscreen API, so please check compatibility if you need to support older versions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
