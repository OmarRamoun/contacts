const { ESLintUtils } = require("@typescript-eslint/utils");

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  defaultOptions: [],
  meta: {
    messages: {
      line: "Expected a space between JSX elements",
    },
    fixable: "whitespace",
    schema: [
      {
        type: "object",
        properties: {
          max: { type: "integer", minimum: 0 }, // depth of JSX.Element to allow to stack next to other JSX.Elements
          "ignore-el": { type: "array" }, // array of element tags to ignore this rule for
        },
      },
    ],
  },
  create(context) {
    const DEFAULT_DEPTH = 5;
    const option = context.options[0] || {};
    const maxDepth = "max" in option ? option.max : DEFAULT_DEPTH;
    const ignoreElements = "ignore-el" in option ? option["ignore-el"] : [];

    function handleJSX(node) {
      if (
        context
          .getAncestors(node)
          .some(
            (n) =>
              n.openingElement &&
              ignoreElements.includes(n.openingElement?.name.name)
          )
      ) {
        return;
      }

      const lineDelta = node.loc.end.line - node.loc.start.line;
      const isMaxDepth = lineDelta >= maxDepth;

      if (!isMaxDepth || !node.parent?.children) return;

      const nodeSiblings = node.parent.children.filter(
        (n) => !n.value || n.value.trim()
      );

      const nodePosition = nodeSiblings.indexOf(node);
      const prevNode = nodeSiblings[nodePosition - 1];
      const nextNode = nodeSiblings[nodePosition + 1];

      if (prevNode) {
        const isPrevNodeOnPrevLine =
          node.loc.start.line - prevNode.loc.end.line === 1;

        if (isPrevNodeOnPrevLine) {
          context.report({
            node,
            messageId: "line",
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
            fix(fixer) {
              return fixer.insertTextAfter(node, "\n");
            },
          });
        }
      }
    }

    return {
      JSXElement: handleJSX,
      JSXFragment: handleJSX,
      JSXExpressionContainer: handleJSX,
    };
  },
});
