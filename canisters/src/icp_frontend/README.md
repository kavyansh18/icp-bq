### 1. Start Local Network
First, start a clean local development network:

```bash
dfx start --clean
```

### 2. Create canister
```bash
dfx canister create icp_backend  
```
```bash
dfx canister create icp_frontend  
```
```bash
dfx canister create evm_rpc  
```

### 3. generate declaration folder
```bash
dfx generate  
```
replace the new icp_backend folder in the declaration folder with the one in the src folder in frontend folder(used in CanisterConfig.tsx)

### 4. Build canisters
```bash
 dfx build icp_backend  
```
```bash
dfx build icp_frontend  
```
```bash
dfx build evm_rpc  
```

### 5. Deploy canisters
```bash
dfx deploy 
```

### Calling function example
```bash
dfx canister call icp_backend addNewNetwork '(                                               
  "https://testnet-rpc.merlinchain.io",
  686868 : nat64,
  "BQ BTC Merlin",
  vec {
    "0xD34E6191A859Dcd50842E3E6283C6Ca83828A073";
    "0x0000000000000000000000000000000000000000"
  },
  "0x6742C558D61163D1Dc0eF3BbdF146164B4BE7B90",
  "0x0000000000000000000000000000000000000000",
  "0x2e6f6080F7EaB18f67353BCcfA7f9248218Ba457",
  "0x00b7425D9de87D30bA47370dc56e8086f4c65FF7"
)'
```

```bash
dfx canister call icp_backend  getNetworkTVL '("https://testnet-rpc.merlinchain.io", 686868)' 
```