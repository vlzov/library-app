import { createContext, useCallback, useContext, useState } from 'react';

const ToastCtx = createContext(null);

let externalNotify = () => {};
export const notify = (msg, type = 'info') => externalNotify(msg, type);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((msg, type = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4500);
  }, []);

  externalNotify = push;

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="toast-stack">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <span className="toast-msg">{t.msg}</span>
            <button
              className="toast-close"
              onClick={() => setToasts(s => s.filter(x => x.id !== t.id))}
            >×</button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);