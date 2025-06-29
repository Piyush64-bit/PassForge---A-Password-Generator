import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

export function Toast({ show, message, type = 'success', onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-4 right-4 z-50"
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
        >
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg backdrop-blur-sm border shadow-lg ${
            type === 'success' 
              ? 'bg-green-100/90 dark:bg-green-900/90 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200'
              : 'bg-red-100/90 dark:bg-red-900/90 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200'
          }`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            >
              {type === 'success' ? <Check size={20} /> : <X size={20} />}
            </motion.div>
            <span className="font-medium">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}