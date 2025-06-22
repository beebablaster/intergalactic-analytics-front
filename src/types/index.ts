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

export interface HistoryEntry {
  id: string;
  filename: string;
  uploadDate: string;
  status: 'success' | 'error';
  report?: ReportData;
} 