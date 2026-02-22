import { useState, useEffect, useCallback } from 'react';

interface Notification {
  id: number;
  message: string;
  startTime: number;
}

// Global event system for notifications
type NotificationListener = (message: string) => void;
const listeners: NotificationListener[] = [];

export function notify(message: string) {
  listeners.forEach(listener => listener(message));
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [nextId, setNextId] = useState(0);

  const addNotification = useCallback((message: string) => {
    const id = nextId;
    setNextId(prev => prev + 1);
    setNotifications(prev => [...prev, { id, message, startTime: Date.now() }]);

    // Remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, [nextId]);

  useEffect(() => {
    listeners.push(addNotification);
    return () => {
      const idx = listeners.indexOf(addNotification);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, [addNotification]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      left: '2rem',
      zIndex: 100,
      fontFamily: "'Roboto Mono', monospace",
      fontSize: '0.75rem',
      maxWidth: '320px',
      pointerEvents: 'none',
    }}>
      {notifications.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  const [visible, setVisible] = useState(true);
  const [flash, setFlash] = useState(true);
  const elapsed = Date.now() - notification.startTime;

  useEffect(() => {
    // Flash effect - toggle every 500ms for first 5 seconds
    const flashInterval = setInterval(() => {
      setFlash(prev => !prev);
    }, 500);

    // Fade out after 4 seconds
    const fadeTimeout = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => {
      clearInterval(flashInterval);
      clearTimeout(fadeTimeout);
    };
  }, []);

  return (
    <div style={{
      color: flash ? 'rgba(180, 180, 180, 0.8)' : 'rgba(180, 180, 180, 0.3)',
      marginBottom: '0.5rem',
      opacity: visible ? 1 : 0,
      transition: 'opacity 1s ease-out, color 0.15s ease',
      textShadow: flash ? '0 0 4px rgba(150, 150, 150, 0.3)' : 'none',
      letterSpacing: '0.02em',
    }}>
      {'>'} {notification.message}
    </div>
  );
}
