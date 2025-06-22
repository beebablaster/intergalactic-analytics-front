import styles from './InfoRow.module.css';

interface InfoRowProps {
  label: string;
  value: string | number | undefined;
}

export const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <div className={styles.infoRow}>
      <div className={styles.value}>{value ?? '-'}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};
