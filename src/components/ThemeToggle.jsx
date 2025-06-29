import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const themes = [
  { name: 'light', icon: Sun, label: 'Light' },
  { name: 'dark', icon: Moon, label: 'Dark' },
  { name: 'system', icon: Monitor, label: 'System' }
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div 
      className="flex bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 border border-white/20 dark:border-gray-700/50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {themes.map(({ name, icon: Icon }) => (
        <motion.button
          key={name}
          onClick={() => setTheme(name)}
          className={`relative p-2 rounded-lg transition-all duration-200 ${
            theme === name 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon size={18} />
          {theme === name && (
            <motion.div
              className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg -z-10"
              layoutId="theme-indicator"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      ))}
    </motion.div>
  );
}