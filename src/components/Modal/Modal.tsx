import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import React from 'react';
import cancelIcon from '../../assets/cancel.svg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalContent}>{children}</div>
        <div className={styles.closeContainer}>
          <button onClick={onClose} className={styles.closeButton}>
            <img src={cancelIcon} alt="close" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
