const { ESLintUtils } = require("@typescript-eslint/utils");

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  defaultOptions: [],
  meta: {
    messages: {
      child:
        "Expected JSX child components to be defined after it is being used",
    },
    schema: [],
  },
  create(context) {
    const sourceCode = context.getSourceCode().text;

    return {
      Program({ body }) {
        body.forEach((node) => {
          if (
            !["VariableDeclaration", "FunctionDeclaration"].includes(node.type)
          )
            return;

          /**
           * @type {Node | false | undefined}
           */
          const nodeReturn = node.declarations
            ? Array.isArray(node.declarations[0].init?.body?.body) &&
              node.declarations[0].init.body.body.find(
                (n) => n.type === "ReturnStatement"
              )
            : node.body.body.find((n) => n.type === "ReturnStatement");

          if (
            !nodeReturn ||
            !["JSXFragment", "JSXElement", "ConditionalExpression"].includes(
              nodeReturn.argument.type
            ) ||
            (nodeReturn.argument.type === "ConditionalExpression" &&
              !["JSXFragment", "JSXElement"].includes(
                nodeReturn.argument.consequent.type
              ))
          ) {
            return;
          }

          const componentName = node.declarations
            ? node.declarations[0].id.name
            : node.id.name;
          const componentLoc = node.declarations
            ? node.range[0]
            : node.range[0];

          let componentLastIndex = sourceCode.lastIndexOf(`<${componentName} `);
          if (componentLastIndex === -1)
            componentLastIndex = sourceCode.lastIndexOf(`<${componentName}\n`);

          if (componentLastIndex !== -1 && componentLastIndex > componentLoc) {
            context.report({
              node,
              messageId: "child",
            });
          }
        });
      },
    };
  },
});
