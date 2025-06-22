import { useReport } from '../../store/reportSlice';
import { Button } from '../../components/Button/Button.tsx';
import s from './GeneratorPage.module.css';

export const GeneratorPage = () => {
  const { phase, downloadReport } = useReport();

  const handleGenerateReport = () => {
    downloadReport();
  };

  return (
    <div className={s.container}>
      <span>Сгенерируйте готовый csv-файл нажатием одной кнопки</span>
      <div className={s.button}>
        <Button variant="primary" loading={phase === 'generating'} onClick={handleGenerateReport}>
          Начать генерацию
        </Button>
      </div>
    </div>
  );
};
