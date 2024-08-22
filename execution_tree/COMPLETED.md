## Documentation: Expression Tree Evaluation

### Overview

This script evaluates a mathematical expression that is represented as a binary tree. 

### Functionality

1. **Reading Data:**
   - The script starts by reading a JSON file named `sample_data.json`. This file contains the structure of the expression tree in JSON format.

2. **Parsing Data:**
   - The content of the JSON file is parsed into a JavaScript object that represents the expression tree. This tree structure is used for the evaluation process.

3. **Defining Node Type:**
   - Each node in the tree is defined as either an operator (like `+`, `-`, `*`, `/`, `^`) or a leaf with a numeric value. The tree nodes can have left and right children, forming a binary tree.

4. **Evaluating the Tree:**
   - The core function of the script recursively evaluates the expression tree. If a node is a leaf (with a numeric value), it returns that value.
   - If a node represents an operator, the script evaluates its left and right children first, applies the operator to these values, and returns the result.

5. **Output:**
   - After evaluating the entire expression tree, the script prints the final result to the console.

This approach allows you to represent and evaluate complex mathematical expressions in a structured and organized manner using a tree-based representation.
