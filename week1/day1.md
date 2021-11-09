# Notes - [youtube](https://youtu.be/ZsZ293yD5Vw)

Motivation of blockchain:

- theme of issues with cash system
- finite supply of tokens
- known supply mechanism
- robust to dissolution of an organisation
- prevent double spend of money

Components:

- Shared public ledger
- Gossip between nodes
- Cryptography

Results:

- Transparency of transactions
- Resilience of state
- Censorship resistance
- Tamper proof interactions

## Secure communication over an insecure channel

Symmetric:

- Decide on common value g.
- A and B generate private and public keys locally
- A and B both apply private keys to g
- A receives B(g) and applys A: A(B(g))
- B receives A(g) and applys B: B(A(g))
- symmetric proporty of A and B A(B(g)) = B(A(g))
- B(A(g)) is the *shared* private key

Unsymmetric:

- A gives B the public key, B secures data with pub A, A deciphers with priv A

## Digital signature

- Bob uses priv A and pub A. Pub A verifies the data was secured with priv A.
- Data remains public, but proof of origin, and proof of contents.
- authenticity
- immutability (tamper proof data)

avalanche effects, inputs near in space does not mean outputs are near in space SHA256

## Merkle tree

- Merkle path can be used to verify that the data is a leaf node of a merkle tree
- Was originally used to check that a library of data hadn't been changed.

## Brief history

- 1998 b-money
- 2009 BTC born
- 2014 Eth born
- 2020 Defi summer
- 2021 NFT/Gaming
- 2022 DAOs?
