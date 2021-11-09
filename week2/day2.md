# Introduction to Ethereum

## History

## Smart contracts

* Evm compatible bytecode deployed to hte network
* [ethstate](https://ethstats.net)
* [txstreet](https://txstreet.com)
* mappings return default values
  * use a struct with a secondary field to differentiate between default and zero values
* when to use `memory` keyword?

## Restrictions

* gas price
* Onlt integer arithmetic. determinism - only 
* Oracles provide data which are put into the blockchain as a transaction.

Ethereum, since london hard fork, pays the miner a base fee + tip and burns an amount.

Smart contracts do not have private keys and thus cannot initiate a transaction

## Account state

* balance (in wei)
* storageRoot - 256 hash of merkle rooot node of contents of the account
* codeHash - hash of the EVM code of this account
* nonce - scalar number equal to the number of transactions sent from this address
