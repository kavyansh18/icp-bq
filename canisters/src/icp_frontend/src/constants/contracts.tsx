import { Address } from "viem";
import { JsonFragment } from "@ethersproject/abi";
import Gov from "./abis/Gov.json";
import ICoverABI from "./abis/InsuranceCover.json";
import InsurancePool from "./abis/InsurancePool.json";
import BQToken from "./abis/BQToken.json";
import bqBTC from "./abis/bqBTC.json";
import VaultABI from "./abis/Vault.json";

export type AddressesType = {
  [key: string]: Address;
};

export type ContractType = {
  abi: JsonFragment[];
  addresses: AddressesType;
};

export const GovContract: ContractType = {
  abi: Gov,
  addresses: {
    pwr: '0xDc75215f45da0374416653f64288c9CD2C2D2478',
    merlin: '0x0000000000000000000000000000000000000000',
    bob: '0x04eBb876dF64c6313926E996D61bbFa5b44241Aa',
    bevm: '0x1C0608698877c5ec29f5DE71a28659Eb3300483b',
    rsk: '0x483842959b2457179561820E9e676da53B63bCD0',
    core: '0x95bEa6bdd0f0adaC1714910069128a4B7F75e135',
    bitlayer: '0x238E8Be85D7C58E85AFAd4eaB80C69333957359A',
    bscTest: '0x794D44550A38632B2e7bACb52B4C4353e13d11B4',
  },
};

export const ICoverContract: ContractType = {
  abi: ICoverABI.abi, 
  addresses: {
    pwr: '0x152C78d6f3D71edc11c11bD3DaD6C042749438b3',
    merlin: '0x73A2ADA74a26bE449eaD2B130BE070Ca2E0908FE',
    bob: '0x2D25d30945adcDCd2C7E2B16aE4a6372D9b5547e',
    bevm: '0xB69527aa72653A71908e95FA166ba3821BA0B79a',
    rsk: '0xfAB08717d5779DBe49Aa6b547b553593f52744c0',
    core: '0xEbC11e13375DEc4c43118b8f530b0dc31fF9e4a7',
    bitlayer: '0x325fEb760bBD9117a0be901FCA79F10D87FDF709',
    bscTest: '0xEe5bbDB9FC36Db581E54d47Fc55dBFEb6d03f47E',
  },
};

export const InsurancePoolContract: ContractType = {
  abi: InsurancePool.abi,
  addresses: {
    pwr: '0x8666c1046f5DD971C0Cf1578291e8A1A413B149f',
    merlin: '0xdedAa296DCab1b5ecFc8A2C9E312b200dcB26581',
    bob: '0x325fEb760bBD9117a0be901FCA79F10D87FDF709',
    bevm: '0x1bc400fe309268A39D3b68093A14257c2c87C531',
    rsk: '0x68543e919B6cd5D884E22Ed85f912daE5De2371b',
    core: '0xFe0330bCAafb69BFB5B6038Be0eBfDB65E2EE10f',
    bitlayer: '0xD19F579fA1d4E53e951fE62cD7acDD9966e62855',
    bscTest: '0xFc226a099aE3068C3A7C7389bcFa0d7FfDa37C0e',
  },
};

export const BQBTCTokenContract: ContractType = {
  abi: bqBTC,
  addresses: {
    pwr: '0x1A6E4F8F8A0E34E6D74119C2588Cf41560F09757',
    merlin: '0x67120D038bEe1775EB1195313E8e95c1ce33Cc77',
    bob: '0x238E8Be85D7C58E85AFAd4eaB80C69333957359A',
    bevm: '0x0611a6e8D876a9E5D408986deFde849C6A56a465',
    rsk: '0x1EfE902d6aFf44d3C8d245f2d4144db84964a9b4',
    core: '0xd4d6D32774267870CB38dd00af8B7edB96eBEfC7',
    bitlayer: '0x260E26e2Cdcdf05C4C93d7a2bd380AaE9D13d0BF',
    bscTest: '0x295eDf61d4368db80ad512c2f4030BfB2244cBa2',
  },
};

export const VaultContract: ContractType = {
  abi: VaultABI.abi,
  addresses: {
    pwr: '0x8666c1046f5DD971C0Cf1578291e8A1A413B149f',
    merlin: '0xc2e8A0B77604A8eba6680b7E2f8c3f2C257319Bd',
    bob: '0x325fEb760bBD9117a0be901FCA79F10D87FDF709',
    bevm: '0x1bc400fe309268A39D3b68093A14257c2c87C531',
    rsk: '0x68543e919B6cd5D884E22Ed85f912daE5De2371b',
    core: '0xFe0330bCAafb69BFB5B6038Be0eBfDB65E2EE10f',
    bitlayer: '0xD19F579fA1d4E53e951fE62cD7acDD9966e62855',
    bscTest: '0xBda761B689b5b9D05E36f8D5A3A5D9be51aCe6c9',
  },
};
