import React from 'react';
import { useCart } from '../context/CartContext';
import Notification from './Notification';

export default function NotificationContainer() {
  const { notification, setNotification } = useCart();

  if (!notification) return null;

  return (
    <Notification
      message={notification.message}
      type={notification.type}
      onClose={() => setNotification(null)}
    />
  );
}