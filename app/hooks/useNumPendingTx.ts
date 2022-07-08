import { useMemo } from "react";
import { useTransactionsStore } from "../stores/transaction"

export const useNumPendingTx = () => {
  const transactionMap = useTransactionsStore(s => s.transactionMap);
  return useMemo(() => {
    return Object.entries(transactionMap).reduce((a, c) => {
      return a + (c[1].status === 'in-progress' ? 1 : 0);
    }, 0);
  }, [transactionMap]);
}