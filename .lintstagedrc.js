/*
const path = require('path');

const buildEslintCommand = (filenames) =>
  `yarn lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

const buildEslintCommand = (filenames) => {
  return `yarn lint --fix --max-warnings=0 --file ${filenames
    .reduce((files, file) => {
      const pathToFile = path.relative(process.cwd(), file);
      if (!ignorePaths.includes(pathToFile)) files.push(pathToFile);
      return files;
    }, [])
    .join(' --file ')}`;
};

module.exports = {
  '*.{ts,tsx,js,jsx}': [buildEslintCommand],
};

*/

const {ESLint} = require('eslint');

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file);
    }),
  );
  const filteredFiles = files.filter((_, i) => !isIgnored[i]);
  return filteredFiles.join(' ');
};

module.exports = {
  '**/*.{ts,tsx,jsx}': async (files) => {
    const filesToLint = await removeIgnoredFiles(files);
    return [`eslint --max-warnings=0 ${filesToLint}`];
  },
};
