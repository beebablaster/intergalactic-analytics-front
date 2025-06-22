import styles from './Header.module.css';
import summerSchoolsIcon from './../../assets/summer_schools.svg';
import uploaderIcon from './../../assets/uploader.svg';
import generatorIcon from './../../assets/generator.svg';
import historyIcon from './../../assets/history.svg';

export const Header = function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <img alt="summer-schools" src={summerSchoolsIcon} />
        <div className={styles.titleText}>
          <span>МЕЖГАЛАКТИЧЕСКАЯ АНАЛИТИКА</span>
        </div>
      </div>
      <div className={styles.navButtons}>
        <div className={styles.navButton}>
          <img src={uploaderIcon} />
          <span>CSV Аналитик</span>
        </div>
        <div className={styles.navButton}>
          <img src={generatorIcon} />
          <span>CSV Генератор</span>
        </div>
        <div className={styles.navButton}>
          <img src={historyIcon} />
          <span>История</span>
        </div>
      </div>
    </header>
  );
};
