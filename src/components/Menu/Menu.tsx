import { MenuItem } from '../MenuItem/MenuItem';
import uploaderIcon from '../../assets/uploader.svg';
import generatorIcon from '../../assets/generator.svg';
import historyIcon from '../../assets/history.svg';
import styles from './Menu.module.css';

export const Menu = () => {
  return (
    <div className={styles.menu}>
      <MenuItem 
        icon={uploaderIcon} 
        text="CSV Аналитик" 
        path="/" 
      />
      <MenuItem 
        icon={generatorIcon} 
        text="CSV Генератор" 
        path="/generate" 
      />
      <MenuItem 
        icon={historyIcon} 
        text="История" 
        path="/history" 
      />
    </div>
  );
};
