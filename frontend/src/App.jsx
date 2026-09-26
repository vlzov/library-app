import HomePage from './pages/HomePage';
import { ToastProvider } from './components/ToastContext';

export default function App() {
  return (
    <ToastProvider>
      <HomePage />
    </ToastProvider>
  );
}