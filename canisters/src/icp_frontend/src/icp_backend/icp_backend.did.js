export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  const Result_2 = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : IDL.Text });
  const Networks = IDL.Record({
    'vault_contract' : IDL.Text,
    'name' : IDL.Text,
    'gov_address' : IDL.Text,
    'evm_pool_contract_address' : IDL.Text,
    'cover_address' : IDL.Text,
    'rpc_url' : IDL.Text,
    'supported_assets' : IDL.Vec(IDL.Text),
  });
  const Result_3 = IDL.Variant({ 'Ok' : Networks, 'Err' : IDL.Text });
  const UserDeposit = IDL.Record({
    'lp' : IDL.Principal,
    'asset' : IDL.Text,
    'accrued_payout' : IDL.Nat,
    'start_date' : IDL.Nat,
    'expiry_date' : IDL.Nat,
    'days_left' : IDL.Nat,
    'pool_id' : IDL.Nat,
    'daily_payout' : IDL.Nat,
    'amount' : IDL.Nat,
  });
  const Result_4 = IDL.Variant({ 'Ok' : UserDeposit, 'Err' : IDL.Text });
  return IDL.Service({
    'Poolwithdraw' : IDL.Func(
        [IDL.Nat64, IDL.Text, IDL.Nat8, IDL.Nat64],
        [Result],
        [],
      ),
    'addNetworkAsset' : IDL.Func([IDL.Nat64, IDL.Text], [Result_1], []),
    'addNewNetwork' : IDL.Func(
        [
          IDL.Text,
          IDL.Nat64,
          IDL.Text,
          IDL.Vec(IDL.Text),
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
        ],
        [Result_1],
        [],
      ),
    'claimProposalFunds' : IDL.Func(
        [IDL.Nat64, IDL.Text, IDL.Nat64],
        [Result],
        [],
      ),
    'getCanisterAddress' : IDL.Func([], [Result], ['query']),
    'getNetworkTVL' : IDL.Func([IDL.Text, IDL.Nat], [Result_2], []),
    'getNetworks' : IDL.Func([IDL.Nat64], [Result_3], ['query']),
    'getOwner' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'getTotalTVL' : IDL.Func([], [Result_2], []),
    'getUserPoolDeposit' : IDL.Func(
        [IDL.Nat64, IDL.Text, IDL.Nat8, IDL.Nat64],
        [Result_4],
        ['query'],
      ),
    'setOwner' : IDL.Func([IDL.Principal], [Result_1], []),
    'setPoolContractAddress' : IDL.Func([IDL.Text], [Result_1], []),
    'updateNetwork' : IDL.Func(
        [
          IDL.Text,
          IDL.Nat64,
          IDL.Text,
          IDL.Vec(IDL.Text),
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
        ],
        [Result_1],
        [],
      ),
    'vaultwithdraw' : IDL.Func(
        [IDL.Nat64, IDL.Text, IDL.Nat8, IDL.Nat64],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
