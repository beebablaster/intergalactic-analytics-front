import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getHistory, addHistoryEntry } from './history';

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  configurable: true,
});

describe('работа с localStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('возвращает пустой массив, если истории нет', () => {
    mockLocalStorage.getItem.mockReturnValueOnce(null);
    expect(getHistory()).toEqual([]);
  });

  it('возвращает распаршенную историю', () => {
    const data = JSON.stringify([
      { id: '1', filename: 'a.csv', uploadDate: 'd', status: 'success' },
    ]);
    mockLocalStorage.getItem.mockReturnValueOnce(data);
    expect(getHistory()).toHaveLength(1);
  });

  it('возвращает пустой массив при битом JSON', () => {
    mockLocalStorage.getItem.mockReturnValueOnce('bad json');
    expect(getHistory()).toEqual([]);
  });

  it('добавляет новую запись и сохраняет в localStorage', () => {
    mockLocalStorage.getItem.mockReturnValueOnce('[]');
    mockLocalStorage.setItem.mockClear();
    addHistoryEntry({ filename: 'b.csv', status: 'success' });
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('обрабатывает список из 100 записей', () => {
    const data = Array.from({ length: 100 }, (_, i) => ({
      id: String(i),
      filename: `${i}.csv`,
      uploadDate: 'd',
      status: 'success',
    }));
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(data));
    expect(getHistory()).toHaveLength(100);
  });
});
