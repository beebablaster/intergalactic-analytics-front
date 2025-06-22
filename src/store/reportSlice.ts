import { create } from 'zustand';
import { getReport } from '../api/api';

type ReportPhase = 'idle' | 'generating' | 'success' | 'error';

interface ReportState {
  phase: ReportPhase;
  error?: string | null;
  downloadReport: (size?: number, withErrors?: string, maxSpend?: string) => Promise<void>;
  reset: () => void;
}

export const useReport = create<ReportState>((set) => ({
  phase: 'idle',
  error: null,

  downloadReport: async (size = 0.01, withErrors = 'on', maxSpend = '1000') => {
    try {
      set({ phase: 'generating', error: null });

      const response = await getReport(size, withErrors, maxSpend);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Не удалось сгенерировать отчет');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      set({ phase: 'success' });
    } catch (error) {
      set({
        phase: 'error',
        error: error.message,
      });
    }
  },

  reset: () => {
    set({
      phase: 'idle',
      error: null,
    });
  },
}));
