import { useEffect } from 'react';
import { getReport } from '../../api/api.ts';
import { Button } from '../../components/Button/Button.tsx';
import { HistoryTable } from '../../components/HistoryTable/HistoryTable.tsx';

export const HistoryPage = () => {
  useEffect(() => {
    async function initData() {
      const res = await getReport();
      console.log(res.body);
    }

    initData();

    return () => {
      console.log('test');
    };
  }, []);

  return (
    <>
      <HistoryTable />
      <Button />
      <Button />
    </>
  );
};
