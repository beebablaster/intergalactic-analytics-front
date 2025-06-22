import { useRef } from 'react';
import { Button } from '../Button/Button';
import { useUpload } from '../../store/uploadSlice';
import { StatusButton } from '../StatusButton/StatusButton';

interface UploadButtonProps {
  onFileSelect?: (file: File) => void;
}

export const UploadButton = ({ onFileSelect }: UploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { phase, fileName, reset } = useUpload();

  const openDialog = () => inputRef.current?.click();
  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (phase === 'idle' || phase === 'fileSelected') && onFileSelect) {
      onFileSelect(file);
    }
  };

  const getStatusPhase = () => {
    switch (phase) {
      case 'uploading':
        return 'loading';
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'fileSelected':
        return 'success';
      default:
        return 'idle';
    }
  };

  if (phase === 'idle') {
    return (
      <div
        style={{
          minWidth: '360px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
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
    <StatusButton
      phase={getStatusPhase()}
      idleText="Загрузить файл"
      loadingText="идёт парсинг файла"
      successText={phase === 'fileSelected' ? 'файл загружен!' : 'готово!'}
      errorText="упс, не то..."
      statusInfo={fileName}
      onAction={openDialog}
      onReset={reset}
      variant="white"
    />
  );
};
