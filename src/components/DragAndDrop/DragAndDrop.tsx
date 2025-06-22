import * as React from 'react';
import { useUpload } from '../../store/uploadSlice';
import { UploadButton } from '../UploadButton/UploadButton';
import s from './DragAndDrop.module.css';

export const DragAndDrop = () => {
  const { phase, uploadFile } = useUpload();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && phase === 'idle') {
      uploadFile(10000, file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className={s.root} onDrop={handleDrop} onDragOver={handleDragOver}>
      Загрузите csv файл и получите <b>полную информацию</b> о нём за сверхнизкое время
      <UploadButton />
      {phase === 'idle' && <p className={s.dropText}>или перетащите сюда</p>}
    </div>
  );
};
