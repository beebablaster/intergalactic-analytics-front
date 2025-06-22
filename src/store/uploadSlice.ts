import { create } from 'zustand';
import { aggregate } from '../api/api';

type Phase = 'idle' | 'uploading' | 'success' | 'error';

export interface ReportData {
  total_spend_galactic?: number;
  rows_affected?: number;
  average_spend_galactic?: number;
  less_spent_at?: number;
  big_spent_at?: number;
  less_spent_value?: number;
  big_spent_value?: number;
  big_spent_civ?: string;
  less_spent_civ?: string;
}

interface UploadState {
  phase: Phase;
  fileName?: string;
  error?: string | null;
  report?: ReportData;
  uploadFile: (rows: number, f: File) => Promise<void>;
  reset: () => void;
}

export const useUpload = create<UploadState>((set) => ({
  phase: 'idle',
  fileName: undefined,
  error: null,
  report: undefined,

  uploadFile: async (rows: number, file: File) => {
    try {
      set({ phase: 'uploading', fileName: file.name, error: null, report: {} });

      const stream = await aggregate(rows, file);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            set({ phase: 'success' });
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
        error: error instanceof Error ? error.message : 'упс, не то...',
      });
    }
  },

  reset: () => {
    set({
      phase: 'idle',
      fileName: undefined,
      error: null,
      report: undefined,
    });
  },
}));
