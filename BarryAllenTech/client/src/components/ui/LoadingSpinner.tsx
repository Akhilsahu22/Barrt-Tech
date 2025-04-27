import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-12 h-12"
      >
        <div className="h-full w-full border-4 border-gray-200 border-t-primary rounded-full"></div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
