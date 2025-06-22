import { create } from 'zustand';
import { aggregate } from '../api/api';

type Phase = 'idle' | 'uploading' | 'success' | 'error';

interface UploadState {
  phase: Phase;
  fileName?: string;
  error?: string | null;
  report?: unknown;
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
      set({ phase: 'uploading', fileName: file.name, error: null });

      const stream = await aggregate(rows, file);
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let result = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        result += decoder.decode(value, { stream: true });
      }

      const lines = result.trim().split('\n');
      const jsonData = lines
        .map((line) => {
          if (line.trim()) {
            return JSON.parse(line);
          }
          return null;
        })
        .filter((item) => item !== null);

      set({ phase: 'success', report: jsonData });
    } catch (error) {
      set({
        phase: 'error',
        error: error instanceof Error ? error.message : 'Upload failed',
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
