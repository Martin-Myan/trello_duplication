import { useEffect } from 'react';

const useLockBodyScroll = (isOpen) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = isOpen ? 'visible' : 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);
};

export default useLockBodyScroll;
