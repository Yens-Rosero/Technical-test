"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var data = fs.readFileSync('./execution_tree/sample.json', 'utf-8');
var expressionTree = JSON.parse(data);
function evaluateExpressionTree(root) {
    var operators = {
        "+": function (a, b) { return a + b; },
        "-": function (a, b) { return a - b; },
        "*": function (a, b) { return a * b; },
        "/": function (a, b) { return a / b; },
        "^": function (a, b) { return Math.pow(a, b); }
    };
    var evaluateNode = function (node) {
        if (node.value !== undefined) {
            return node.value;
        }
        if (node.action) {
            var leftValue = evaluateNode(node.left);
            var rightValue = evaluateNode(node.right);
            return operators[node.action](leftValue, rightValue);
        }
        throw new Error("Invalid node");
    };
    return evaluateNode(root);
}
var result = evaluateExpressionTree(expressionTree);
console.log('Resultado:', result);
