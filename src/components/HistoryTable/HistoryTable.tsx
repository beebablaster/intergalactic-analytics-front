import { HistoryRow } from '../HistoryRow/HistoryRow';
import type { HistoryEntry } from '../../types';
import s from './HistoryTable.module.css';

interface HistoryTableProps {
  entries: HistoryEntry[];
  onDelete: (id: string) => void;
  onEntryClick: (entry: HistoryEntry) => void;
}

export const HistoryTable = ({ entries, onDelete, onEntryClick }: HistoryTableProps) => {
  if (entries.length === 0) {
    return <div className={s.empty}>История пуста</div>;
  }

  return (
    <div className={s.table}>
      {entries.map((entry) => (
        <HistoryRow key={entry.id} entry={entry} onDelete={onDelete} onClick={onEntryClick} />
      ))}
    </div>
  );
};
