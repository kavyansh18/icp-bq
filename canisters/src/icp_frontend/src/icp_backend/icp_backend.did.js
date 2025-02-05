export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  const Result_2 = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : IDL.Text });
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
    'getNetworkTVL' : IDL.Func([IDL.Text, IDL.Nat], [Result_2], ['query']),
    'getOwner' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'getTotalTVL' : IDL.Func([], [Result_2], ['query']),
    'setOwner' : IDL.Func([IDL.Principal], [Result_1], []),
    'setPoolContractAddress' : IDL.Func([IDL.Text], [Result_1], []),
    'vaultwithdraw' : IDL.Func(
        [IDL.Nat64, IDL.Text, IDL.Nat8, IDL.Nat64],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
