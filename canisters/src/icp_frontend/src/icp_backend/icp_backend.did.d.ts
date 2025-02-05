import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'Ok' : string } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : null } |
  { 'Err' : string };
export type Result_2 = { 'Ok' : bigint } |
  { 'Err' : string };
export interface _SERVICE {
  'Poolwithdraw' : ActorMethod<[bigint, string, number, bigint], Result>,
  'addNetworkAsset' : ActorMethod<[bigint, string], Result_1>,
  'addNewNetwork' : ActorMethod<
    [string, bigint, string, Array<string>, string, string, string, string],
    Result_1
  >,
  'claimProposalFunds' : ActorMethod<[bigint, string, bigint], Result>,
  'getCanisterAddress' : ActorMethod<[], Result>,
  'getNetworkTVL' : ActorMethod<[string, bigint], Result_2>,
  'getOwner' : ActorMethod<[], [] | [Principal]>,
  'getTotalTVL' : ActorMethod<[], Result_2>,
  'setOwner' : ActorMethod<[Principal], Result_1>,
  'setPoolContractAddress' : ActorMethod<[string], Result_1>,
  'vaultwithdraw' : ActorMethod<[bigint, string, number, bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
