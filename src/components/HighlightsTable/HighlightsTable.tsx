import { InfoRow } from '../InfoRow/InfoRow.tsx';
import styles from './HighlightsTable.module.css';
import type { ReportData } from '../../store/uploadSlice.ts';

interface HighlightsTableProps {
  data?: ReportData;
}

function dayOfYearToDate(day: number | undefined) {
  if (day === undefined) return '-';
  const date = new Date(new Date().getFullYear(), 0);
  date.setDate(day);
  return date.toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
  });
}

export const HighlightsTable = ({ data }: HighlightsTableProps) => {
  if (!data) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>Здесь появятся хайлайты</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      <InfoRow label="общие расходы в галактических кредитах" value={data.total_spend_galactic} />
      <InfoRow label="цивилизация с минимальными расходами" value={data.less_spent_civ} />
      <InfoRow label="количество обработанных записей" value={data.rows_affected} />
      <InfoRow
        label="день года с максимальными расходами"
        value={dayOfYearToDate(data.big_spent_at)}
      />
      <InfoRow
        label="день года с минимальными расходами"
        value={dayOfYearToDate(data.less_spent_at)}
      />
      <InfoRow label="максимальная сумма расходов за день" value={data.big_spent_value} />
      <InfoRow label="цивилизация с максимальными расходами" value={data.big_spent_civ} />
      <InfoRow
        label="средние расходы в галактических кредитах"
        value={data.average_spend_galactic?.toFixed(2)}
      />
    </div>
  );
};
