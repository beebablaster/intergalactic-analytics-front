import { useNavigate, useLocation } from 'react-router-dom';
import styles from './MenuItem.module.css';

interface MenuItemProps {
  icon: string;
  text: string;
  path: string;
}

export const MenuItem = ({ icon, text, path }: MenuItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSelected = location.pathname === path || (path === '/' && location.pathname === '/');

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div 
      className={`${styles.menuItem} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
    >
      <img src={icon} alt={text} />
      <span>{text}</span>
    </div>
  );
};
