import image from '@rollup/plugin-image';
import svgr from '@svgr/rollup';
import progress from 'rollup-plugin-progress';
import rollupTypescript from 'rollup-plugin-typescript2';

const defaultSettings = {
  input: './src/assets/source.ts',
  output: {
    dir: './src/assets/build',
    format: 'cjs',
    external: ['react'],
  },
  plugins: [
    progress(),
    rollupTypescript({
      objectHashIgnoreUnknownHack: true,
      check: !!process.env.CI,
      tsconfig: './src/assets/tsconfig.json',
    }),
    image({exclude: './**/*.svg'}),
    svgr({
      svgo: true,
      svgoConfig: {
        plugins: [
          // removeDimensions: true,
          'removeDimensions',
        ],
      },
    }),
  ],
};

export default defaultSettings;
