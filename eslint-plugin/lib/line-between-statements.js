const { ESLintUtils } = require("@typescript-eslint/utils");

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  defaultOptions: [],
  meta: {
    messages: {
      line: "Expected an empty space around this {{ type }}",
    },
    fixable: "whitespace",
    schema: [],
  },
  create(context) {
    function handleNode(node, type = "statement") {
      const isMultiLine = node.loc.end.line - node.loc.start.line > 0;
      const isReturnStatement = node.type === "ReturnStatement";

      if ((!isMultiLine && !isReturnStatement) || !node.parent?.body) return;

      const nodeSiblings = node.parent.body;
      const nodePosition = nodeSiblings.indexOf(node);
      const prevNode = nodeSiblings[nodePosition - 1];
      const nextNode = nodeSiblings[nodePosition + 1];

      if (prevNode) {
        const isPrevNodeOnPrevLine =
          node.loc.start.line - prevNode.loc.end.line === 1;
        const isPrevNodeOneLine =
          prevNode.loc.start.line === prevNode.loc.end.line;

        const isPrevNodeOfDifferentType =
          isReturnStatement ||
          (node.type.includes("Statement") &&
            !prevNode.type.includes("Statement")) ||
          (node.type.includes("Declaration") &&
            !prevNode.type.includes("Declaration"));

        if (
          isPrevNodeOnPrevLine &&
          ((isReturnStatement && !isPrevNodeOneLine) ||
            !(isPrevNodeOneLine && isPrevNodeOfDifferentType))
        ) {
          context.report({
            node,
            messageId: "line",
            data: { type },
            fix(fixer) {
              return fixer.insertTextAfter(prevNode, "\n");
            },
          });
        }
      }

      if (nextNode) {
        const isNextNodeOnNextLine =
          nextNode.loc.start.line - node.loc.end.line === 1;

        if (isNextNodeOnNextLine) {
          context.report({
            node,
            messageId: "line",
            data: { type },
            fix(fixer) {
              return fixer.insertTextAfter(node, "\n");
            },
          });
        }
      }
    }

    return {
      TSTypeAliasDeclaration: (node) => handleNode(node, "declaration"),
      VariableDeclaration: (node) => handleNode(node, "declaration"),
      ExportNamedDeclaration: (node) => handleNode(node, "declaration"),
      TSInterfaceDeclaration: (node) => handleNode(node, "declaration"),
      ExpressionStatement: (node) => handleNode(node, "statement"),
      IfStatement: (node) => handleNode(node, "statement"),
      ReturnStatement: (node) => handleNode(node, "statement"),
    };
  },
});
