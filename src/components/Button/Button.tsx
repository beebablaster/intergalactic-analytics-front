import clsx from 'clsx';
import s from './Button.module.css';

export type Variant = 'primary' | 'success' | 'danger' | 'ghost' | 'white' | 'clear' | 'disabled';

type Props = {
  variant?: Variant;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ variant = 'primary', loading, disabled, children, ...rest }: Props) => (
  <button {...rest} disabled={disabled || loading} className={clsx(s.root, s[variant])}>
    {loading && <span className={s.spinner} />}
    <span className={loading ? s.hidden : undefined}>{children}</span>
  </button>
);
