import { InfoRow } from '../InfoRow/InfoRow.tsx';
import styles from './HighlightsTable.module.css';
import type { ReportData } from '../../types';
import clsx from 'clsx';

interface HighlightsTableProps {
  data?: ReportData;
  variant?: 'default' | 'modal';
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

export const HighlightsTable = ({ data, variant = 'default' }: HighlightsTableProps) => {
  if (!data) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>Здесь появятся хайлайты</p>
      </div>
    );
  }

  return (
    <div className={clsx(styles.grid, variant === 'modal' && styles.modalGrid)}>
      <InfoRow
        label="общие расходы в галактических кредитах"
        value={data.total_spend_galactic}
        variant={variant}
      />
      <InfoRow
        label="цивилизация с минимальными расходами"
        value={data.less_spent_civ}
        variant={variant}
      />
      <InfoRow
        label="количество обработанных записей"
        value={data.rows_affected}
        variant={variant}
      />
      <InfoRow
        label="день года с максимальными расходами"
        value={dayOfYearToDate(data.big_spent_at)}
        variant={variant}
      />
      <InfoRow
        label="день года с минимальными расходами"
        value={dayOfYearToDate(data.less_spent_at)}
        variant={variant}
      />
      <InfoRow
        label="максимальная сумма расходов за день"
        value={data.big_spent_value}
        variant={variant}
      />
      <InfoRow
        label="цивилизация с максимальными расходами"
        value={data.big_spent_civ}
        variant={variant}
      />
      <InfoRow
        label="средние расходы в галактических кредитах"
        value={data.average_spend_galactic?.toFixed(2)}
        variant={variant}
      />
    </div>
  );
};
