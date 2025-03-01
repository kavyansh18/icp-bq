import { useEffect } from 'react';

import { VaultContract } from 'constants/contracts';

import { useAccount, useBlockNumber, useReadContract } from 'wagmi';
import { IVault } from 'types/common';
import { ChainType } from 'lib/wagmi';

export const useVault = (vaultId: number) => {
  const { chain } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: vaultData, refetch } = useReadContract({
    abi: VaultContract.abi,
    address: VaultContract.addresses[(chain as ChainType)?.chainNickName || 'bscTest'],
    functionName: 'getVault',
    args: [vaultId],
  });

  useEffect(() => {
    refetch();
    console.log('vault by id', vaultData);

    if (vaultData && typeof vaultData === 'object' && 'pools' in vaultData && Array.isArray(vaultData.pools)) {
      const totalApy = vaultData.pools.reduce((sum, pool) => sum + Number(pool.apy || 0), 0);
      const avgApy = totalApy / vaultData.pools.length;
      console.log(`Average APY for vault ${vaultId}:`, avgApy);
    } else {
      console.log(`No pools found in vault ${vaultId}.`);
    }
  }, [blockNumber]);

  if (!vaultData) return undefined;

  try {
    const result = vaultData as IVault;
    if (!result) return undefined;

    return result;
  } catch (error) {
    return undefined;
  }
};
