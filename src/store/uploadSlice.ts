import { create } from 'zustand';
import { aggregate } from '../api/api';
import { addHistoryEntry } from '../utils/historyStorage';
import type { ReportData } from '../types';

type Phase = 'idle' | 'fileSelected' | 'uploading' | 'success' | 'error';

interface UploadState {
  phase: Phase;
  fileName?: string;
  selectedFile?: File;
  error?: string | null;
  report?: ReportData;
  selectFile: (file: File) => void;
  uploadFile: (rows: number, f: File) => Promise<void>;
  reset: () => void;
}

export const useUpload = create<UploadState>((set, get) => ({
  phase: 'idle',
  fileName: undefined,
  selectedFile: undefined,
  error: null,
  report: undefined,

  selectFile: (file: File) => {
    set({ selectedFile: file, fileName: file.name, phase: 'fileSelected' });
  },

  uploadFile: async (rows: number, file: File) => {
    try {
      set({
        phase: 'uploading',
        fileName: file.name,
        error: null,
        report: {},
        selectedFile: undefined,
      });

      const stream = await aggregate(rows, file);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            set({ phase: 'success' });
            const { fileName, report } = get();
            if (fileName) {
              addHistoryEntry({
                filename: fileName,
                status: 'success',
                report,
              });
            }
            return;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.trim()) {
              try {
                const update = JSON.parse(line);
                set((state) => ({ report: { ...state.report, ...update } }));
              } catch (e) {
                console.error('Не получилось спарсить строку:', line, e);
              }
            }
          }
        }
      };

      await processStream();
    } catch (error) {
      set({
        phase: 'error',
        error: error.message,
        selectedFile: undefined,
      });
      const { fileName, report } = get();
      if (fileName) {
        addHistoryEntry({
          filename: fileName,
          status: 'error',
          report,
        });
      }
    }
  },

  reset: () => {
    set({
      phase: 'idle',
      fileName: undefined,
      selectedFile: undefined,
      error: null,
      report: undefined,
    });
  },
}));
