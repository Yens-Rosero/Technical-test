import * as fs from 'fs';

const data = fs.readFileSync('./execution_tree/sample.json', 'utf-8');

const expressionTree = JSON.parse(data);

type TreeNode = { value?: number; action?: string; left?: TreeNode; right?: TreeNode };

function evaluateExpressionTree(root: TreeNode): number {
  const operators = {
    "+": (a: number, b: number) => a + b,
    "-": (a: number, b: number) => a - b,
    "*": (a: number, b: number) => a * b,
    "/": (a: number, b: number) => a / b,
    "^": (a: number, b: number) => Math.pow(a, b)
  };

  const evaluateNode = (node: TreeNode): number => {
    if (node.value !== undefined) {
      return node.value;
    }

    if (node.action) {
      const leftValue = evaluateNode(node.left!);
      const rightValue = evaluateNode(node.right!);
      return operators[node.action](leftValue, rightValue);
    }

    throw new Error("Invalid node");
  };

  return evaluateNode(root);
}

const result = evaluateExpressionTree(expressionTree);
console.log('Resultado:', result);
