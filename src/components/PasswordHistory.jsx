import { motion, AnimatePresence } from 'framer-motion';
import { History, Copy, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function PasswordHistory({ passwords, onCopy, onClear }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = async (password, index) => {
    await onCopy(password);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!passwords.length) return null;

  return (
    <motion.div
      className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <History size={20} className="text-primary-500" />
          </motion.div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Recent Passwords
          </h3>
        </div>
        <motion.button
          onClick={onClear}
          className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 size={16} />
        </motion.button>
      </div>
      
      <div className="space-y-2">
        <AnimatePresence>
          {passwords.map((password, index) => (
            <motion.div
              key={`${password}-${index}`}
              className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg border border-white/30 dark:border-gray-600/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <code className="flex-1 text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
                {password}
              </code>
              <motion.button
                onClick={() => handleCopy(password, index)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  copiedIndex === index
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600/50'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Copy size={14} />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}