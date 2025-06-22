import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HistoryTable } from '../../components/HistoryTable/HistoryTable';
import { clearHistory, getHistory, removeHistoryEntry } from '../../utils/historyStorage';
import type { HistoryEntry } from '../../types';
import { Modal } from '../../components/Modal/Modal';
import { HighlightsTable } from '../../components/HighlightsTable/HighlightsTable';
import s from './HistoryPage.module.css';
import { Button } from '../../components/Button/Button';

export const HistoryPage = () => {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setEntries(getHistory());
  }, []);

  const handleDelete = (id: string) => {
    removeHistoryEntry(id);
    setEntries(getHistory());
  };

  const handleClearAll = () => {
    clearHistory();
    setEntries([]);
  };

  const handleEntryClick = (entry: HistoryEntry) => {
    if (entry.status === 'success') {
      setSelectedEntry(entry);
    }
  };

  const closeModal = () => {
    setSelectedEntry(null);
  };

  return (
    <div className={s.page}>
      <HistoryTable entries={entries} onDelete={handleDelete} onEntryClick={handleEntryClick} />
      <div className={s.buttons}>
        <Button
          children="Сгенерировать больше"
          variant="primary"
          onClick={() => navigate('/generate')}
        />
        <Button variant="clear" onClick={handleClearAll} disabled={entries.length === 0}>
          Очистить всё
        </Button>
      </div>

      <Modal isOpen={!!selectedEntry} onClose={closeModal}>
        {selectedEntry && (
          <>
            <HighlightsTable data={selectedEntry.report} variant="modal" />
          </>
        )}
      </Modal>
    </div>
  );
};
