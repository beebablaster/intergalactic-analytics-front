import { useRef } from 'react';
import { Button } from '../Button/Button';
import { useUpload } from '../../store/uploadSlice';
import s from './UploadButton.module.css';
import cancelIcon from '../../assets/cancel.svg';
import clsx from 'clsx';

interface UploadButtonProps {
  onFileSelect?: (file: File) => void;
  mode?: 'upload' | 'generator';
  onGenerate?: () => void;
  generatorPhase?: 'idle' | 'generating' | 'success' | 'error';
  generatorError?: string | null;
  generatorReset?: () => void;
}

export const UploadButton = ({
  onFileSelect,
  mode = 'upload',
  onGenerate,
  generatorPhase,
  generatorError,
  generatorReset,
}: UploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadState = useUpload();

  const isGeneratorMode = mode === 'generator';
  const phase = isGeneratorMode ? generatorPhase : uploadState.phase;
  const fileName = uploadState.fileName;
  const reset = isGeneratorMode ? generatorReset : uploadState.reset;

  const openDialog = () => inputRef.current?.click();
  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (phase === 'idle' || phase === 'fileSelected') && onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleGenerate = () => {
    if (onGenerate) {
      onGenerate();
    }
  };

  const getStatusText = () => {
    if (isGeneratorMode) {
      return phase === 'generating'
        ? 'идёт процесс генерации'
        : phase === 'success'
          ? 'файл сгенерирован!'
          : phase === 'error'
            ? generatorError || 'упс, не то...'
            : '';
    }

    return phase === 'fileSelected'
      ? 'файл загружен!'
      : phase === 'uploading'
        ? 'идёт парсинг файла'
        : phase === 'success'
          ? 'готово!'
          : 'упс, не то...';
  };

  if (phase === 'idle') {
    return (
      <div className={s.statusContainer}>
        {isGeneratorMode ? (
          <Button variant="primary" onClick={handleGenerate}>
            Начать генерацию
          </Button>
        ) : (
          <>
            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              style={{ display: 'none' }}
              onChange={onPick}
            />
            <Button variant="white" onClick={openDialog}>
              Загрузить файл
            </Button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={s.statusContainer}>
      <div className={s.topRow}>
        <div
          className={clsx(
            s.statusWrapper,
            (phase === 'fileSelected' || phase === 'generating') && s.uploading,
            phase === 'uploading' && s.uploading,
            phase === 'success' && s.success,
            phase === 'error' && s.danger,
          )}
        >
          {phase !== 'uploading' && phase !== 'generating' && (
            <div className={s.fileInfo}>
              <span>{isGeneratorMode ? (phase === 'success' ? 'Done' : 'Ошибка') : fileName}</span>
            </div>
          )}
          {(phase === 'uploading' || phase === 'generating') && <div className={s.spinner} />}
        </div>

        {phase !== 'uploading' && phase !== 'generating' && (
          <div className={s.resetContainer}>
            <button onClick={() => reset?.()} className={s.resetButton}>
              <img src={cancelIcon} alt="cancel" />
            </button>
          </div>
        )}
      </div>

      <span className={s.statusText}>{getStatusText()}</span>
    </div>
  );
};
