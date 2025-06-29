import { vi, describe, it, expect, beforeEach } from 'vitest';
import { aggregate } from './api';

function createFile(name = 'test.csv', size = 1, type = 'text/csv') {
  const blob = new Blob(['a'.repeat(size)], { type });
  return new File([blob], name, { type });
}

const mockFetch = vi.fn();
window.fetch = mockFetch;

describe('загрузка и аналитика CSV', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('загружает корректный CSV и возвращает поток', async () => {
    const mockStream = { getReader: () => ({}) };
    mockFetch.mockResolvedValueOnce({ ok: true, body: mockStream });
    const file = createFile();
    const result = await aggregate(10, file);
    expect(result).toBe(mockStream);
    expect(fetch).toHaveBeenCalled();
  });

  it('обрабатывает пустой файл', async () => {
    const file = createFile('empty.csv', 0);
    mockFetch.mockResolvedValueOnce({ ok: true, body: {} });
    await expect(aggregate(10, file)).resolves.toBeDefined();
  });

  it('обрабатывает огромный файл', async () => {
    const file = createFile('huge.csv', 10 ** 7);
    mockFetch.mockResolvedValueOnce({ ok: true, body: {} });
    await expect(aggregate(10, file)).resolves.toBeDefined();
  });

  it('обрабатывает некорректный тип файла', async () => {
    const file = createFile('bad.txt', 10, 'text/plain');
    mockFetch.mockResolvedValueOnce({ ok: true, body: {} });
    await expect(aggregate(10, file)).resolves.toBeDefined();
  });

  it('обрабатывает ошибку сервера 500', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, json: async () => ({ message: 'fail' }) });
    const file = createFile();
    await expect(aggregate(10, file)).rejects.toThrow('fail');
  });
});
