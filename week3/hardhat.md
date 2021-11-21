# Notes

npm is a package manager for javascript. 		

## Using npm:

* `npm install <package>` / `npm i <package>`

* create a project structure `npx hardhat`
* subsequent commands `npx hardhat <command>`

## Solidity in vscode

In order for the vscode default solidity extension to find openzepplin contracts installed with `npm install @openzeppelin/contracts`,
the following needs to be added to the vscode settings.

```json
{
"solidity.packageDefaultDependenciesContractsDirectory": "",
"solidity.packageDefaultDependenciesDirectory": "node_modules"
}
```

## Chai / Mocha Testing

offers `expect`, `assert`, `should`
