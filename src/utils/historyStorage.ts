import type { HistoryEntry } from '../types';

const HISTORY_KEY = 'uploadHistory';

export const getHistory = (): HistoryEntry[] => {
  const historyJson = localStorage.getItem(HISTORY_KEY);
  if (!historyJson) {
    return [];
  }
  try {
    return JSON.parse(historyJson);
  } catch (e) {
    console.error('Ошибка при получении данных', e);
    return [];
  }
};

export const addHistoryEntry = (entry: Omit<HistoryEntry, 'id' | 'uploadDate'>): void => {
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: new Date().toISOString() + Math.random(),
    uploadDate: new Date().toLocaleDateString('ru-RU'),
  };
  const newHistory = [newEntry, ...history];
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
};

export const removeHistoryEntry = (id: string): void => {
  const history = getHistory();
  const newHistory = history.filter((entry) => entry.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
};

export const clearHistory = (): void => {
  localStorage.removeItem(HISTORY_KEY);
};
