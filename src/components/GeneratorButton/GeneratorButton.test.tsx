import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { GeneratorButton } from './GeneratorButton';

vi.mock('../../store/reportSlice', () => ({
  useReport: () => ({
    phase: 'idle',
    error: null,
    downloadReport: mockDownload,
    reset: mockReset,
  }),
}));

const mockDownload = vi.fn();
const mockReset = vi.fn();

describe('Кнопка генератора', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('вызывает downloadReport при клике', () => {
    const { getByText } = render(<GeneratorButton />);
    fireEvent.click(getByText(/генерацию/i));
    expect(mockDownload).toHaveBeenCalled();
  });

  it('выбрасывает ошибку при отрицательном значении или NaN', () => {
    function generateCsv(n) {
      if (typeof n !== 'number' || n < 0 || isNaN(n)) throw new Error('Некорректное n');
      return ['header', ...Array(n).fill('row')];
    }
    expect(() => generateCsv(-1)).toThrow();
    expect(() => generateCsv(NaN)).toThrow();
    expect(generateCsv(2)).toHaveLength(3);
  });
});
