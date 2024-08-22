# Technical Test Documentation

## Overview

This application is designed to perform dynamic calculations based on a database structure containing two types of elements: `users` and `actions`. Users have specific roles, and actions contain either a handler type or associated data, along with a required role to execute them. Calculations are made using the results from child actions or data attached to those actions.

## Tasks Completed

### 1. Authorization Logic (`authorize.js`)

I implemented the authorization logic in `src/authorize.js` to manage user roles and check if a user has the necessary permissions to perform an action. The roles are hierarchical as follows:

- `SYS_ADMIN > LOCAL_ADMIN > ENTERPRISE_USER > BASIC_USER`

The code compares the roles between the user and the action, ignoring the roles of child actions. If the user's role is equal to or greater than the required role of the action, authorization is granted.

### 2. `Newest` Handler (`newest.ts`)

I implemented the `Newest` handler, which returns the item with the most recent timestamp from a list of actions. The code scans the DynamoDB database for all actions and uses `reduce` to find the item with the latest date.

### 3. Action Calculation with Child Nodes (`calculate.js`)

I developed the recursive calculation function to process actions in the correct order, starting with child actions and using the results as inputs for parent actions. Depending on the handler type (`COUNTER` or `NEWEST`), the respective operations are executed. This function also handles errors and ensures consistent results.

### 4. Tests

Finally, I performed the necessary tests to verify the application's functionality. I fixed misconfigurations in the existing test files and adjusted the tests to validate calculations and authorization. I also added new test cases where necessary, ensuring best practices in unit testing.
