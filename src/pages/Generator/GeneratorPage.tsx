import { useEffect } from 'react';
import { getReport } from '../../api/api.ts';
import { Button } from '../../components/Button/Button.tsx';

export const GeneratorPage = () => {
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
      <span>Сгенерируйте готовый csv-файл нажатием одной кнопки</span>
      <Button />
    </>
  );
};
