/**
 * LoadingScreen — Animated intro shown while the app bootstraps.
 */
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07050f]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={onComplete}
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <img
          src="/assets/logo.png"
          alt="KHUSHWAQT.com"
          className="h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]"
        />
      </motion.div>

      {/* Spinner ring */}
      <motion.div
        className="mt-8 w-10 h-10 rounded-full border-2 border-purple-800 border-t-purple-400"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-sm text-gray-500 font-medium"
      >
        Loading portfolio…
      </motion.p>
    </motion.div>
  );
}
