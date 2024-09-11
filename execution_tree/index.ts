import * as fs from 'fs';

const filename = process.argv[2];
if (!filename) {
    console.error("ERROR: Cannot find");
    process.exit(1);
}

const data = fs.readFileSync(filename, 'utf-8');
const expressionTree = JSON.parse(data);

type TreeNode = { value?: number; action?: string; left?: TreeNode; right?: TreeNode };

type Operator = "+" | "-" | "*" | "/" | "^";

const operators: { [key in Operator]: (a: number, b: number) => number } = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "^": (a, b) => Math.pow(a, b),
};

function evaluateExpressionTree(root: TreeNode): number {
    const stack: Array<{ node: TreeNode; leftValue?: number }> = [{ node: root }];

    while (stack.length > 0) {
        const { node, leftValue } = stack.pop()!;
        
        if (node.value !== undefined) {
            if (leftValue === undefined) {
                return node.value;
            }
        }

        if (node.action) {
            const rightValue = node.right?.value !== undefined ? node.right.value : 0;
            const result = operators[node.action as Operator](leftValue || 0, rightValue);

            if (stack.length > 0) {
                stack[stack.length - 1].leftValue = result;
            } else {
                return result;
            }
        }

        if (node.left) {
            stack.push({ node: node.left });
        }
        if (node.right) {
            stack.push({ node: node.right });
        }
    }

    throw new Error("Invalid tree");
}

const result = evaluateExpressionTree(expressionTree);
console.log('result:', result);
