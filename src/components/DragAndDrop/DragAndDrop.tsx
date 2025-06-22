import * as React from 'react';
import { useUpload } from '../../store/uploadSlice';
import { UploadButton } from '../UploadButton/UploadButton';
import { Button } from '../Button/Button';
import s from './DragAndDrop.module.css';

export const DragAndDrop = () => {
  const { phase, selectedFile, selectFile, uploadFile } = useUpload();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && phase === 'idle') {
      selectFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileSelect = (file: File) => {
    selectFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadFile(10000, selectedFile);
    }
  };

  const showUploadButton = phase === 'idle';
  const buttonVariant = selectedFile ? 'primary' : 'disabled';

  return (
    <div className={s.container}>
      <div className={s.text}>
        Загрузите csv файл и получите <b>полную информацию</b> о нём за сверхнизкое время
      </div>

      <div className={s.root} onDrop={handleDrop} onDragOver={handleDragOver}>
        <UploadButton onFileSelect={handleFileSelect} />
        {phase === 'idle' && <p className={s.dropText}>или перетащите сюда</p>}
      </div>

      {showUploadButton && (
        <div className={s.buttonContainer}>
          <Button variant={buttonVariant} onClick={handleUpload} className={s.uploadButton}>
            Отправить
          </Button>
        </div>
      )}
    </div>
  );
};
