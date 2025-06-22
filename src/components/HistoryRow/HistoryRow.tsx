import s from './HistoryRow.module.css';
import type { HistoryEntry } from '../../types';
import fileIcon from '../../assets/file.svg';
import trashIcon from '../../assets/trash.svg';
import successIcon from '../../assets/smiley.svg';
import errorIcon from '../../assets/smiley_sad.svg';
import clsx from 'clsx';

interface HistoryRowProps {
  entry: HistoryEntry;
  onDelete: (id: string) => void;
  onClick: (entry: HistoryEntry) => void;
}

export const HistoryRow = ({ entry, onDelete, onClick }: HistoryRowProps) => {
  const isSuccess = entry.status === 'success';

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(entry.id);
  };

  return (
    <div className={s.container}>
      <div className={s.row} onClick={() => onClick(entry)}>
        <div className={s.fileInfo}>
          <img src={fileIcon} alt="file" />
          <span>{entry.filename}</span>
        </div>
        <div className={s.date}>{entry.uploadDate}</div>
        <div className={clsx(s.status, isSuccess ? s.success : s.error)}>
          {isSuccess ? 'Обработан успешно' : 'Не удалось обработать'}
          <img src={isSuccess ? successIcon : errorIcon} alt="status" />
        </div>
      </div>
      <button onClick={handleDelete} className={s.deleteButton}>
        <img src={trashIcon} alt="delete" />
      </button>
    </div>
  );
};
