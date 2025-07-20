//This allows us to pull the user screen res and scale accordingly.
//Yes, technically best practice is to display different res of images depending, no I won't do that.

export interface ScreenSize {
  width: number;
  height: number;
}

export function getScreenResolution(): ScreenSize {
  return {
    width: window.screen.width,
    height: window.screen.height
  };
}

export function getViewportSize(): ScreenSize {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}
