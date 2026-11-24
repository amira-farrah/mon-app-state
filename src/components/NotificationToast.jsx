import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../redux/uiSlice';

export default function NotificationToast() {
  const { message, visible } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => dispatch(hideToast()), 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, message, dispatch]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'green',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px'
      }}
    >
      {message}
    </div>
  );
}