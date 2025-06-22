import { useReport } from '../../store/reportSlice';
import { StatusButton } from '../StatusButton/StatusButton';

interface GeneratorButtonProps {
  onGenerate?: () => void;
}

export const GeneratorButton = ({ onGenerate }: GeneratorButtonProps) => {
  const { phase, error, downloadReport, reset } = useReport();

  const handleGenerate = () => {
    if (onGenerate) {
      onGenerate();
    } else {
      downloadReport();
    }
  };

  const getStatusPhase = () => {
    switch (phase) {
      case 'generating':
        return 'loading';
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'idle';
    }
  };

  const getStatusInfo = () => {
    if (phase === 'success') return 'Done';
    if (phase === 'error') return 'Ошибка';
    return undefined;
  };

  return (
    <StatusButton
      phase={getStatusPhase()}
      idleText="Начать генерацию"
      loadingText="идёт процесс генерации"
      successText="файл сгенерирован!"
      errorText={error || 'упс, не то...'}
      statusInfo={getStatusInfo()}
      onAction={handleGenerate}
      onReset={reset}
      variant="primary"
    />
  );
};
