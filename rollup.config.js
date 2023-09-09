import image from '@rollup/plugin-image';
import svgr from '@svgr/rollup';
import progress from 'rollup-plugin-progress';
import rollupTypescript from 'rollup-plugin-typescript2';

module.exports = {
  input: './src/assets/index.ts',
  output: {
    dir: './src/assets/build',
    format: 'cjs',
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
      native: true,
      svgo: true,
      svgoConfig: {
        plugins: {
          removeDimensions: true,
        },
      },
    }),
  ],
};
