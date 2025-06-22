import { useReport } from '../../store/reportSlice';
import { UploadButton } from '../../components/UploadButton/UploadButton';
import s from './GeneratorPage.module.css';

export const GeneratorPage = () => {
  const { phase, error, downloadReport, reset } = useReport();

  const handleGenerateReport = () => {
    downloadReport();
  };

  return (
    <div className={s.container}>
      <span>Сгенерируйте готовый csv-файл нажатием одной кнопки</span>
      <div className={s.button}>
        <UploadButton
          mode="generator"
          onGenerate={handleGenerateReport}
          generatorPhase={phase}
          generatorError={error}
          generatorReset={reset}
        />
      </div>
    </div>
  );
};
