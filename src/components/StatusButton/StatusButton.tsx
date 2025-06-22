import { Button } from '../Button/Button';
import s from './StatusButton.module.css';
import cancelIcon from '../../assets/cancel.svg';
import clsx from 'clsx';

interface StatusButtonProps {
  phase: 'idle' | 'loading' | 'success' | 'error';
  idleText: string;
  loadingText: string;
  successText: string;
  errorText: string;
  statusInfo?: string;
  onAction: () => void;
  onReset?: () => void;
  variant?: 'primary' | 'white';
}

export const StatusButton = ({
  phase,
  idleText,
  loadingText,
  successText,
  errorText,
  statusInfo,
  onAction,
  onReset,
  variant = 'primary',
}: StatusButtonProps) => {
  const statusText =
    phase === 'loading'
      ? loadingText
      : phase === 'success'
        ? successText
        : phase === 'error'
          ? errorText
          : '';

  if (phase === 'idle') {
    return (
      <div className={s.statusContainer}>
        <Button variant={variant} onClick={onAction}>
          {idleText}
        </Button>
      </div>
    );
  }

  return (
    <div className={s.statusContainer}>
      <div className={s.topRow}>
        <div
          className={clsx(
            s.statusWrapper,
            phase === 'loading' && s.loading,
            phase === 'success' && s.success,
            phase === 'error' && s.danger,
          )}
        >
          {phase !== 'loading' && statusInfo && (
            <div className={s.statusInfo}>
              <span>{statusInfo}</span>
            </div>
          )}
          {phase === 'loading' && <div className={s.spinner} />}
        </div>

        {phase !== 'loading' && onReset && (
          <div className={s.resetContainer}>
            <button onClick={onReset} className={s.resetButton}>
              <img src={cancelIcon} alt="cancel" />
            </button>
          </div>
        )}
      </div>

      <span className={s.statusText}>{statusText}</span>
    </div>
  );
};
