import { useRef } from 'react';
import { Button } from '../Button/Button';
import { useUpload } from '../../store/uploadSlice';
import s from './UploadButton.module.css';
import cancelIcon from '../../assets/cancel.svg';
import clsx from 'clsx';

interface UploadButtonProps {
  onFileSelect?: (file: File) => void;
}

export const UploadButton = ({ onFileSelect }: UploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { phase, fileName, reset } = useUpload();

  const openDialog = () => inputRef.current?.click();
  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && phase === 'idle' && onFileSelect) {
      onFileSelect(file);
    }
  };

  const statusText =
    phase === 'uploading'
      ? 'идёт парсинг файла'
      : phase === 'success'
        ? 'готово!'
        : 'упс, не то...';

  if (phase === 'idle') {
    return (
      <div>
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
      </div>
    );
  }

  return (
    <div className={s.statusContainer}>
      <div className={s.topRow}>
        <div
          className={clsx(
            s.statusWrapper,
            phase === 'uploading' && s.uploading,
            phase === 'success' && s.success,
            phase === 'error' && s.danger,
          )}
        >
          {phase !== 'uploading' && (
            <div className={s.fileInfo}>
              <span>{fileName}</span>
            </div>
          )}
          {phase === 'uploading' && <div className={s.spinner} />}
        </div>

        {phase !== 'uploading' && (
          <div className={s.resetContainer}>
            <button onClick={() => reset()} className={s.resetButton}>
              <img src={cancelIcon} alt="cancel" />
            </button>
          </div>
        )}
      </div>

      {phase === 'uploading' && <span>{fileName}</span>}
      <span className={s.statusText}>{statusText}</span>
    </div>
  );
};
