# More solidity

## Inheritence

* contracts inherit from another using `is` keyword

## Data types

* cant slice or index a string
* must use bytes.concatenate(bytes(s1), bytes(s2)) to concat strings

Storage, memory, call data
for primitive types you dont need to specify where. for reference data types you need to specify this

* storage - expensive, global
* memory - function scoped, cheap, temporary
* calldata - cheaper but fixed, cannot be changed, goof for args and return types.

### `constant` and `immutable` keywords

* constant declared at compile time
* immutable can be assigned at construction/deployment time - must be initialised by the constructor

### Interfaces

Same as go. Defines the function signatures, which is implemented in a contract.

### Fallback and Receive functions

If the EVM cannot find the function the tx is trying to call, it will execute the `fallback` function

`receive` is called if someone sends ether to the smart contract, without any data. If receive is not specified and someone send eth, then fallback is called.
