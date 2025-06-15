import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AuthProvider } from './context/AuthContext.jsx';

// Add dark class on load if dark mode is enabled in localStorage
if (localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark');
}
const userAuth = { role: "admin" };
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider value={userAuth}>
      <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
