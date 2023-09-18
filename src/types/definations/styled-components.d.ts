import {theme} from '../styles';

export type AppTheme = typeof theme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AppTheme {}
}
