import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export function Footer() {
  return (
    <motion.footer
      className="mt-16 pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="text-center flex flex-col items-center gap-4">
        <motion.p 
          className="text-sm text-gray-600 dark:text-gray-400"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          © 2025 Designed & Developed by{' '}
          <motion.span
            className="font-bold tracking-widest bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-clip-text text-transparent"
            whileHover={{ 
              backgroundPosition: '200% center',
              transition: { duration: 0.5 }
            }}
            style={{
              backgroundSize: '200% 100%',
            }}
          >
            P I Y U $ H
          </motion.span>
        </motion.p>

        <div className="flex gap-4">
          <motion.a
            href="https://github.com/Piyush64-bit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 text-white dark:text-gray-900 shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaGithub size={20} />
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/piyush64bit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 text-white dark:text-gray-900 shadow-lg"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaLinkedin size={20} />
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
}
