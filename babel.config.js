module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-syntax-jsx',
    ['styled-components', {ssr: true, displayName: true}],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@screens': './src/screens',
          '@data': './src/data',
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@interfaces': './src/interfaces',
          '@lib': './src/lib',
          '@types': './src/types',
          '@layouts': './src/layouts',
          '@state': './src/state',
          '@stacks': './src/stacks',
          '@pages': './src/pages',
          '@shared': './src/shared',
          '@styles': './src/styles',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
