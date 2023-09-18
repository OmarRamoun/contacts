declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.png';
declare module '*.jpg';
