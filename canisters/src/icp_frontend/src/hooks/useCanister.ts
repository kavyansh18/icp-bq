import { useState, useCallback } from 'react';
import { createActor } from '../utils/Canister-config';
import type { Result } from '../../../declarations/icp_backend/icp_backend.did';

export const useCanister = () => {
  const [accounts, setAccounts] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAccount = useCallback(async (owner: string, initialBalance: bigint) => {
    setLoading(true);
    setError(null);
    try {
      const actor = createActor();
      const result = await (await actor).createAccount(owner, initialBalance);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const actor = createActor();
      const result = await (await actor).getAccounts();
      setAccounts(result as Result[]);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch accounts');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    accounts,
    loading,
    error,
    createAccount,
    fetchAccounts,
  };
};