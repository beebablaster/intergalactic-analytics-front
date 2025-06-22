import styles from './InfoRow.module.css';
import clsx from 'clsx';

interface InfoRowProps {
  label: string;
  value: string | number | undefined;
  variant?: 'default' | 'modal';
}

export const InfoRow = ({ label, value, variant = 'default' }: InfoRowProps) => {
  return (
    <div className={clsx(styles.infoRow, variant === 'modal' && styles.modalRow)}>
      <div className={styles.value}>{value ?? '-'}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};
