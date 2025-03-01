import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface HttpHeader { 'value' : string, 'name' : string }
export interface HttpResponse {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export interface NetworkDetails {
  'gas' : bigint,
  'chain_id' : bigint,
  'nonce' : bigint,
  'gas_price' : bigint,
}
export interface Networks {
  'vault_contract' : string,
  'name' : string,
  'gov_address' : string,
  'evm_pool_contract_address' : string,
  'cover_address' : string,
  'rpc_url' : string,
  'supported_assets' : Array<string>,
}
export type Result = { 'Ok' : string } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : null } |
  { 'Err' : string };
export type Result_2 = { 'Ok' : NetworkDetails } |
  { 'Err' : string };
export type Result_3 = { 'Ok' : bigint } |
  { 'Err' : string };
export type Result_4 = { 'Ok' : Networks } |
  { 'Err' : string };
export type Result_5 = { 'Ok' : UserDeposit } |
  { 'Err' : string };
export interface TransformArgs {
  'context' : Uint8Array | number[],
  'response' : HttpResponse,
}
export interface UserDeposit {
  'lp' : Principal,
  'asset' : string,
  'accrued_payout' : bigint,
  'start_date' : bigint,
  'expiry_date' : bigint,
  'days_left' : bigint,
  'pool_id' : bigint,
  'daily_payout' : bigint,
  'amount' : bigint,
}
export interface _SERVICE {
  'Poolwithdraw' : ActorMethod<[bigint, string, number, bigint], Result>,
  'addNetworkAsset' : ActorMethod<[bigint, string], Result_1>,
  'addNewNetwork' : ActorMethod<
    [string, bigint, string, Array<string>, string, string, string, string],
    Result_1
  >,
  'claimProposalFunds' : ActorMethod<[bigint, string, bigint], Result>,
  'getCanisterAddress' : ActorMethod<[], Result>,
  'getNetworkDetails' : ActorMethod<[bigint], Result_2>,
  'getNetworkTVL' : ActorMethod<[string, bigint], Result_3>,
  'getNetworks' : ActorMethod<[bigint], Result_4>,
  'getOwner' : ActorMethod<[], [] | [Principal]>,
  'getTotalTVL' : ActorMethod<[], Result_3>,
  'getUserPoolDeposit' : ActorMethod<
    [bigint, string, number, bigint],
    Result_5
  >,
  'setOwner' : ActorMethod<[Principal], Result_1>,
  'setPoolContractAddress' : ActorMethod<[string], Result_1>,
  'transform' : ActorMethod<[TransformArgs], HttpResponse>,
  'updateNetwork' : ActorMethod<
    [string, bigint, string, Array<string>, string, string, string, string],
    Result_1
  >,
  'vaultwithdraw' : ActorMethod<[bigint, string, number, bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
