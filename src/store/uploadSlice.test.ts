import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useUpload } from './uploadSlice';
import * as api from '../services/api';

function createMockStream(chunks, errorAt = null) {
  let i = 0;
  return {
    getReader: () => ({
      read: async () => {
        if (errorAt !== null && i === errorAt) throw new Error('ошибка потока');
        if (i < chunks.length) return { done: false, value: chunks[i++] };
        return { done: true };
      },
    }),
  };
}

describe('useUpload — потоковая обработка файла', () => {
  let origAggregate;
  beforeEach(() => {
    origAggregate = api.aggregate;
    vi.clearAllMocks();
  });

  it('обрабатывает успешный сценарий с чанками', async () => {
    vi.spyOn(api, 'aggregate').mockResolvedValueOnce(
      createMockStream([
        new TextEncoder().encode('{"a":1}\n'),
        new TextEncoder().encode('{"b":2}\n'),
      ]),
    );
    const store = useUpload.getState();
    await store.uploadFile(1, new File([''], 'a.csv'));
    expect(useUpload.getState().phase).toBe('success');
    expect(useUpload.getState().report).toMatchObject({ a: 1, b: 2 });
  });

  it('обрабатывает ситуацию, когда поток зависает (нет чанков)', async () => {
    vi.spyOn(api, 'aggregate').mockResolvedValueOnce(createMockStream([]));
    const store = useUpload.getState();
    await store.uploadFile(1, new File([''], 'a.csv'));
    expect(useUpload.getState().phase).toBe('success');
  });

  it('обрабатывает некорректный JSON-чанк', async () => {
    vi.spyOn(api, 'aggregate').mockResolvedValueOnce(
      createMockStream([
        new TextEncoder().encode('notjson\n'),
        new TextEncoder().encode('{"ok":1}\n'),
      ]),
    );
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const store = useUpload.getState();
    await store.uploadFile(1, new File([''], 'a.csv'));
    expect(useUpload.getState().report).toMatchObject({ ok: 1 });
    errorSpy.mockRestore();
  });

  it('обрабатывает ошибку потока', async () => {
    vi.spyOn(api, 'aggregate').mockResolvedValueOnce(
      createMockStream([new TextEncoder().encode('{"a":1}\n')], 1),
    );
    const store = useUpload.getState();
    await store.uploadFile(1, new File([''], 'a.csv'));
    expect(useUpload.getState().phase).toBe('error');
  });
});
