import { useEffect } from 'react';
import { getReports } from '../../api/api.ts';

export const UploaderPage = () => {
  useEffect(() => {
    async function initData() {
      const res = await getReports(0.01);
      console.log(res.body);
    }

    initData();

    return () => {
      console.log('test');
    };
  }, []);

  return <>i bet he doesnt</>;
};
