# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Intellisense - cjp added

Added jsconfig.json to get intellisense to work on libraries imported in scripts using `require` - see [vscode docs](https://code.visualstudio.com/docs/nodejs/working-with-javascript)
