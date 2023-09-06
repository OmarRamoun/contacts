const {ESLintUtils} = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  defaultOptions: [],
  meta: {
    messages: {
      name: 'Expected file name to follow the kebab-case',
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    const fileName = !context.getFilename().match('packages')
      ? context.getFilename().replace(/^.*[\\/]/, '')
      : context
          .getFilename()
          .replace(
            /^.*[\\/]src(\/|\\)(components|assets|lib|types|styles|redux|layouts)(\/|\\)/,
            '',
          );

    return {
      Program(node) {
        // eslint-disable-next-line no-restricted-syntax
        for (const name of [
          'jsPdf-font',
          'serviceWorker',
        ]) {
          if (fileName.match(new RegExp(name))) return;
        }

        if (fileName.match(/[A-Z]/)) {
          context.report({node, messageId: 'name'});
        }
      },
    };
  },
});
