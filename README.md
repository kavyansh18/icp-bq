# BQLabs Testnet Contracts v1

## Overview

BQ Labs is pioneering the first Bitcoin Risk Management Layer, aiming to secure the Bitcoin ecosystem through a decentralized insurance infrastructure. The BQ Protocol provides a robust technical, operational, and legal framework that enables members to underwrite and trade risk as a liquid asset, purchase coverage, and efficiently assess claims. This protocol is designed to bring transparency, trust, and efficiency to the Bitcoin financial landscape.

## Architecture

BQ Labs v1 Testnet contract leverages the use of ICP's technologies to enable seamless communication across multiple EVM compatible chains while keeping liquidity on the ICP canister as the base chain.

![ICP Diagram](https://brown-high-badger-463.mypinata.cloud/ipfs/bafkreict3vflusnnhwv7pibagzvl2jshei3bvixnxyakrb6ntqxgxf23ym)

## Technical Details

- **ICP Alloy :**
  The use of ICP Alloy to interact with contracts across multiple EVM networks while maintaining compatibility with ICP and creating signatures of executing transactions

- **IC CDK API :**
  For making HTTP calls

- **Liquid Insurance Tokens (LITs) :**
  The use of LITs on the individual networks to represent users staked/ deposited assets

- ICP canister URL :
  icp_backend: https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=lpi4p-cqaaa-aaaal-qsgaa-cai

## Running the Project

1. Start the Internet Computer

```
dfx start --background
```

2. Install dependencies

```
pnpm install
```

3. Deploy the canisters

```
dfx deploy
```

### Develop

During development, you can run the frontend with hot reloading using Vite.

```
pnpm run dev
```
