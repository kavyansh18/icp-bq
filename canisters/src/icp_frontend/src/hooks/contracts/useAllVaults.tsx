import { useEffect } from 'react';

import { VaultContract } from 'constants/contracts';

import { useAccount, useBlockNumber, useReadContract } from 'wagmi';
import { ICover, IVault, IPool } from 'types/common';
import { ChainType } from 'lib/wagmi';

export const useAllVaults = () => {
  const { chain } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: vaults, refetch } = useReadContract({
    abi: VaultContract.abi,
    address: VaultContract.addresses[(chain as ChainType)?.chainNickName || 'bscTest'],
    functionName: 'getVaults',
    args: [],
  });

  useEffect(() => {
    refetch();
    // console.log("vaults", vaults);
  
    // if (vaults) {
    //   const vaultsArray = vaults as IVault[];
    //   vaultsArray.forEach((vault, index) => {
    //     if (vault.pools && vault.pools.length > 0) {
    //       const totalApy = vault.pools.reduce((sum: number, pool: IPool) => sum + Number(pool.apy), 0);
    //       const avgApy = totalApy / vault.pools.length;
    //       console.log(`Average APY for vault ${index}:`, avgApy);
    //     } else {
    //       console.log(`No pools found in vault ${index}.`);
    //     }
    //   });
    // }
  }, [blockNumber]);

  if (!vaults) return [];

  try {
    const result = vaults as IVault[];
    if (!result) return [];

    return result;
  } catch (error) {
    return [];
  }
};
