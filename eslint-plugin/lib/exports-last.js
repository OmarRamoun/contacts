const { ESLintUtils } = require("@typescript-eslint/utils");

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  defaultOptions: [],
  meta: {
    messages: {
      export: "Export statements should appear at the end of the file",
    },
    schema: [],
  },

  create(context) {
    function isNonExportStatement({ type }) {
      return (
        type !== "ExportDefaultDeclaration" &&
        type !== "ExportNamedDeclaration" &&
        type !== "ExportAllDeclaration"
      );
    }

    return {
      Program({ body }) {
        const lastNonExportStatementIndex = body.reduce(function findLastIndex(
          acc,
          item,
          index
        ) {
          return isNonExportStatement(item) ? index : acc;
        },
        -1);

        if (lastNonExportStatementIndex !== -1) {
          body
            .slice(0, lastNonExportStatementIndex)
            .forEach(function checkNonExport(node) {
              if (
                !isNonExportStatement(node) &&
              !['TSInterfaceDeclaration', 'TSTypeAliasDeclaration', 'TSEnumDeclaration'].includes(node.declaration?.type) && // prettier-ignore
              !['ObjectExpression', 'ArrayExpression', 'Literal', 'UnaryExpression'].includes(node.declaration?.declarations?.[0].init.type) // prettier-ignore
              ) {
                context.report({
                  node,
                  messageId: "export",
                });
              }
            });
        }
      },
    };
  },
});
