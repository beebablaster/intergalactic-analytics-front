import styles from './Header.module.css';
import summerSchoolsIcon from './../../assets/summer_schools.svg';
import { Menu } from '../Menu/Menu';

export const Header = function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <img alt="summer-schools" src={summerSchoolsIcon} />
        <div className={styles.titleText}>
          <span>МЕЖГАЛАКТИЧЕСКАЯ АНАЛИТИКА</span>
        </div>
      </div>
      <Menu />
    </header>
  );
};
