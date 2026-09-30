import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('fnea-theme') || 'system');
  const [systemDark, setSystemDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);
  const dark = mode === 'dark' || (mode === 'system' && systemDark);
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = (e) => setSystemDark(e.matches);
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  }, [dark]);
  const toggle = () => setMode((current) => {
    const next = (current === 'dark' || (current === 'system' && systemDark)) ? 'light' : 'dark';
    localStorage.setItem('fnea-theme', next);
    return next;
  });
  return <ThemeContext.Provider value={{ dark, mode, toggle }}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => useContext(ThemeContext);
