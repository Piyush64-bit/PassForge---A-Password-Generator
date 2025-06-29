import { motion } from 'framer-motion';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

export function PasswordStrengthIndicator({ strength, className = '' }) {
  const getStrengthIcon = () => {
    if (strength.score >= 60) return ShieldCheck;
    if (strength.score >= 30) return Shield;
    return ShieldAlert;
  };

  const StrengthIcon = getStrengthIcon();

  return (
    <motion.div 
      className={`flex items-center gap-3 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <motion.div
          whileHover={{ rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <StrengthIcon size={20} className={strength.color} />
        </motion.div>
        <span className={`font-medium text-sm ${strength.color}`}>
          {strength.text}
        </span>
      </div>
      
      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 min-w-0">
        <motion.div
          className={`h-full rounded-full ${strength.bgColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${strength.score}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      <span className="text-xs text-gray-500 dark:text-gray-400 min-w-fit">
        {strength.score}%
      </span>
    </motion.div>
  );
}