import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, 
  Copy, 
  Eye, 
  EyeOff, 
  Settings, 
  Zap,
  Lock,
  Shuffle
} from 'lucide-react';
import { generatePassword, calculatePasswordStrength } from './utils/passwordGenerator';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ThemeToggle } from './components/ThemeToggle';
import { PasswordStrengthIndicator } from './components/PasswordStrengthIndicator';
import { PasswordHistory } from './components/PasswordHistory';
import { Toast } from './components/Toast';
import { BackgroundElements } from './components/BackgroundElements';
import { Footer } from './components/Footer';

function App() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(16);
  const [showPassword, setShowPassword] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true
  });

  const [passwordHistory, setPasswordHistory] = useLocalStorage('passwordHistory', []);

  const strength = calculatePasswordStrength(password, options);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  }, []);

  const handleGeneratePassword = useCallback(async () => {
    // Check if at least one option is selected
    const hasOptions = Object.values(options).some(Boolean);
    if (!hasOptions) {
      showToast('Please select at least one character type', 'error');
      return;
    }

    setIsGenerating(true);
    
    // Add a slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newPassword = generatePassword(passwordLength, options);
    setPassword(newPassword);
    
    // Add to history (keep only last 3)
    setPasswordHistory(prev => {
      const updated = [newPassword, ...prev.filter(p => p !== newPassword)];
      return updated.slice(0, 3);
    });
    
    setIsGenerating(false);
  }, [passwordLength, options, setPasswordHistory, showToast]);

  const handleCopyPassword = useCallback(async (passwordToCopy = password) => {
    if (!passwordToCopy) {
      showToast('No password to copy', 'error');
      return;
    }

    try {
      await navigator.clipboard.writeText(passwordToCopy);
      showToast('Password copied to clipboard!');
    } catch (error) {
      showToast('Failed to copy password', 'error');
    }
  }, [password, showToast]);

  const handleOptionChange = useCallback((option) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  }, []);

  const clearHistory = useCallback(() => {
    setPasswordHistory([]);
    showToast('Password history cleared');
  }, [setPasswordHistory, showToast]);

  return (
    <div className="min-h-screen text-gray-900 dark:text-white relative">
      <BackgroundElements />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header 
          className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl shadow-lg"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Lock size={24} className="text-white" />
            </motion.div>
            <div>
              <motion.h1 
                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                PassForge
              </motion.h1>
              <motion.p 
                className="text-sm text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Craft secure passwords with style
              </motion.p>
            </div>
          </motion.div>
          
          <ThemeToggle />
        </motion.header>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Password Display */}
          <motion.div
            className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: isGenerating ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Zap size={20} className="text-primary-500" />
                </motion.div>
                <h2 className="text-lg font-semibold">Generated Password</h2>
              </div>

              <div className="relative">
                <motion.div
                  className="relative p-4 bg-gray-100 dark:bg-gray-700/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 min-h-[60px] flex items-center"
                  animate={password ? { borderStyle: 'solid', borderColor: 'rgb(59 130 246)' } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {password ? (
                    <motion.code
                      className="font-mono text-lg text-gray-800 dark:text-gray-200 break-all flex-1 pr-20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ filter: showPassword ? 'none' : 'blur(4px)' }}
                    >
                      {password}
                    </motion.code>
                  ) : (
                    <div className="text-gray-500 dark:text-gray-400 flex-1">
                      Click "Generate" to create a secure password
                    </div>
                  )}

                  {password && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                      <motion.button
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </motion.button>

                      <motion.button
                        onClick={() => handleCopyPassword()}
                        className="p-2 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Copy size={18} />
                      </motion.button>
                    </div>
                  )}
                </motion.div>

                {password && (
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <PasswordStrengthIndicator strength={strength} />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Settings Panel */}
          <motion.div
            className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 45 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Settings size={20} className="text-primary-500" />
              </motion.div>
              <h2 className="text-lg font-semibold">Password Settings</h2>
            </div>

            <div className="space-y-6">
              {/* Password Length */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-medium text-gray-700 dark:text-gray-300">
                    Password Length
                  </label>
                  <motion.span 
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 rounded-full text-sm font-semibold"
                    key={passwordLength}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {passwordLength}
                  </motion.span>
                </div>
                <motion.input
                  type="range"
                  min="4"
                  max="50"
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  whileFocus={{ scale: 1.02 }}
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>4</span>
                  <span>50</span>
                </div>
              </div>

              {/* Character Options */}
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Include Characters
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'uppercase', label: 'Uppercase (A-Z)', example: 'ABC' },
                    { key: 'lowercase', label: 'Lowercase (a-z)', example: 'abc' },
                    { key: 'numbers', label: 'Numbers (0-9)', example: '123' },
                    { key: 'special', label: 'Special (!@#$)', example: '!@#' },
                  ].map(({ key, label, example }, index) => (
                    <motion.label
                      key={key}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 cursor-pointer transition-all hover:bg-white/70 dark:hover:bg-gray-700/70"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <input
                          type="checkbox"
                          checked={options[key]}
                          onChange={() => handleOptionChange(key)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 transition-all ${
                          options[key]
                            ? 'bg-primary-500 border-primary-500' 
                            : 'border-gray-400 dark:border-gray-500'
                        }`}>
                          {options[key] && (
                            <motion.svg
                              className="w-3 h-3 text-white mx-auto mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </motion.svg>
                          )}
                        </div>
                      </motion.div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                          {example}
                        </div>
                      </div>
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <motion.button
                onClick={handleGeneratePassword}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ rotate: isGenerating ? 360 : 0 }}
                    transition={{ duration: 0.5, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
                  >
                    {isGenerating ? <RefreshCw size={20} /> : <Shuffle size={20} />}
                  </motion.div>
                  {isGenerating ? 'Generating...' : 'Generate Password'}
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Password History */}
          <PasswordHistory 
            passwords={passwordHistory}
            onCopy={handleCopyPassword}
            onClear={clearHistory}
          />
        </div>

        <Footer />
      </div>

      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}

export default App;