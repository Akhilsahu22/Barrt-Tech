import { motion } from "framer-motion";
import { fadeIn, slideUp } from "@/lib/animations";

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="pt-28 md:pt-40 pb-20 md:pb-32 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 relative"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary-gradient">
              Technology at the Speed of Light
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Barry Allen Private Limited delivers cutting-edge technology solutions that accelerate your business transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#contact" className="px-8 py-4 bg-primary hover:bg-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                Get Started
              </a>
              <a href="#services" className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-center">
                Explore Services
              </a>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 md:pl-10"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 rounded-3xl transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Technology illustration" 
                className="relative rounded-3xl shadow-2xl z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
    </section>
  );
};

export default Hero;
