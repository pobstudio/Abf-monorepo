import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePriorityAccount } from '../connectors/priority';
import { useBlockchainStore } from '../stores/blockchain';
import { useProvider } from './useProvider';
export const useBalance = () => {
  const provider = useProvider(true);
  const account = usePriorityAccount();
  const balance = useBlockchainStore(
    useCallback((s) => s.balanceMap[account ?? ''], [account]),
  );
  const [localBalance, setLocalBalance] = useState<string | undefined>(
    undefined,
  );
  useEffect(() => {
    if (!provider || !account) {
      return;
    }
    provider.getBalance(account).then((v) => {
      setLocalBalance(v.toString());
    });
  }, [provider, account, setLocalBalance]);

  return useMemo(() => balance ?? localBalance ?? '0', [localBalance]);
};
